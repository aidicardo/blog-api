import { signJwt, signRefreshJwt, verifyRefreshJwt } from '../utils/jwt.js';

class TokenService {
  refreshTokens = new Set();

  generateTokens(payload) {
    const accessToken = signJwt(payload);
    const refreshToken = signRefreshJwt(payload);
    this.refreshTokens.add(refreshToken);
    return { accessToken, refreshToken };
  }

  validateRefreshToken(token) {
    if (!this.refreshTokens.has(token)) return null;
    try {
      return verifyRefreshJwt(token);
    } catch {
      return null;
    }
  }

  revokeRefreshToken(token) {
    this.refreshTokens.delete(token);
  }
}

export const tokenService = new TokenService();
