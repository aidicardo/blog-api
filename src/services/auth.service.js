import bcrypt from 'bcrypt';
import { db } from '../config/db.js';
import { User } from '../models/user.model.js';
import { tokenService } from './token.service.js';

let userIdCounter = 1;

export const register = async ({ email, password }) => {
  const existing = db.users.find((u) => u.email === email);
  if (existing) {
    throw Object.assign(new Error('Email already in use'), { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ id: userIdCounter++, email, passwordHash });
  db.users.push(user);
  const tokens = tokenService.generateTokens({ sub: user.id });
  return { user: { id: user.id, email: user.email }, ...tokens };
};

export const login = async ({ email, password }) => {
  const user = db.users.find((u) => u.email === email);
  if (!user) {
    throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  }
  const tokens = tokenService.generateTokens({ sub: user.id });
  return { user: { id: user.id, email: user.email }, ...tokens };
};

export const refresh = async (token) => {
  const payload = tokenService.validateRefreshToken(token);
  if (!payload) {
    throw Object.assign(new Error('Invalid refresh token'), { status: 401 });
  }
  const { accessToken, refreshToken } = tokenService.generateTokens({ sub: payload.sub });
  tokenService.revokeRefreshToken(token);
  return { accessToken, refreshToken };
};

export const logout = async (token) => {
  tokenService.revokeRefreshToken(token);
};
