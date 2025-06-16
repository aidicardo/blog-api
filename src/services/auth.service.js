import bcrypt from 'bcrypt';
import { getDB, saveDB } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import { tokenService } from './token.service.js';

export const register = async ({ email, password }) => {
  const db = getDB();
  if (db.users.some(u => u.email === email)) {
    throw Object.assign(new Error('Email already in use'), { status: 409 });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = { id: uuid(), email, password: hash };
  db.users.push(user);
  await saveDB();
  const tokens = tokenService.generateTokens({ sub: user.id });
  return { user: { id: user.id, email: user.email }, ...tokens };
};

export const login = async ({ email, password }) => {
  const db = getDB();
  const user = db.users.find(u => u.email === email);
  if (!user) {
    throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  }
  const tokens = tokenService.generateTokens({ sub: user.id });
  return { user: { id: user.id, email: user.email }, ...tokens };
};

export const refresh = async token => {
  const payload = tokenService.validateRefreshToken(token);
  if (!payload) {
    throw Object.assign(new Error('Invalid refresh token'), { status: 401 });
  }
  const { accessToken, refreshToken } = tokenService.generateTokens({ sub: payload.sub });
  tokenService.revokeRefreshToken(token);
  return { accessToken, refreshToken };
};

export const logout = async token => {
  tokenService.revokeRefreshToken(token);
};
