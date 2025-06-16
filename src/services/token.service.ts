import { signJwt, signRefreshJwt, verifyRefreshJwt } from '../utils/jwt.js';

class TokenService {
  private refreshTokens = new Set<string>();

  generateTokens(payload: object): { accessToken: string; refreshToken: string } {
    const accessToken = signJwt(payload);
    const refreshToken = signRefreshJwt(payload);
    this.refreshTokens.add(refreshToken);
    return { accessToken, refreshToken };
  }

  validateRefreshToken(token: string): ReturnType<typeof verifyRefreshJwt> | null {
    if (!this.refreshTokens.has(token)) return null;
    try {
      return verifyRefreshJwt(token);
    } catch {
      return null;
    }
  }

  revokeRefreshToken(token: string): void {
    this.refreshTokens.delete(token);
  }
}

export const tokenService = new TokenService();
