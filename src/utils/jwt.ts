import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signJwt = (
  payload: object,
  options: SignOptions = {}
): string =>
  jwt.sign(payload, env.jwtSecret as string, {
    ...options,
    expiresIn: env.jwtExpiresIn,
  } as SignOptions);

export const signRefreshJwt = (
  payload: object,
  options: SignOptions = {}
): string =>
  jwt.sign(payload, env.refreshSecret as string, {
    ...options,
    expiresIn: env.refreshExpiresIn,
  } as SignOptions);

export const verifyJwt = (token: string): JwtPayload | string =>
  jwt.verify(token, env.jwtSecret);
export const verifyRefreshJwt = (token: string): JwtPayload | string =>
  jwt.verify(token, env.refreshSecret);
