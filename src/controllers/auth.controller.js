import * as authService from '../services/auth.service.js';

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const result = await authService.refresh(refreshToken);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    await authService.logout(refreshToken);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
