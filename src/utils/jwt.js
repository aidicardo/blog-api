import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signJwt = (payload, options = {}) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn, ...options });

export const signRefreshJwt = (payload, options = {}) =>
  jwt.sign(payload, env.refreshSecret, {
    expiresIn: env.refreshExpiresIn,
    ...options,
  });

export const verifyJwt = (token) => jwt.verify(token, env.jwtSecret);
export const verifyRefreshJwt = (token) => jwt.verify(token, env.refreshSecret);
