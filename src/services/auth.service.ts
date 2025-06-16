import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { tokenService } from './token.service.js';

interface Credentials {
  email: string;
  password: string;
}

export const register = async ({ email, password }: Credentials) => {
  const existing = await User.findOne({ email }).lean();
  if (existing) {
    throw Object.assign(new Error('Email already in use'), { status: 409 });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  const tokens = tokenService.generateTokens({ sub: user.id });
  return { user: { id: user.id, email: user.email }, ...tokens };
};

export const login = async ({ email, password }: Credentials) => {
  const user = await User.findOne({ email });
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

export const refresh = async (token: string) => {
  const payload = tokenService.validateRefreshToken(token);
  if (!payload) {
    throw Object.assign(new Error('Invalid refresh token'), { status: 401 });
  }
  const { accessToken, refreshToken } = tokenService.generateTokens({ sub: payload.sub });
  tokenService.revokeRefreshToken(token);
  return { accessToken, refreshToken };
};

export const logout = async (token: string): Promise<void> => {
  tokenService.revokeRefreshToken(token);
};
