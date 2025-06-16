import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signJwt = (payload, options = {}) =>
  jwt.sign(payload, env.jwtSecret, {
    ...options,
    expiresIn: env.jwtExpiresIn,
  });

export const signRefreshJwt = (payload, options = {}) =>
  jwt.sign(payload, env.refreshSecret, {
    ...options,
    expiresIn: env.refreshExpiresIn,
  });

export const verifyJwt = token => jwt.verify(token, env.jwtSecret);
export const verifyRefreshJwt = token =>
  jwt.verify(token, env.refreshSecret);
