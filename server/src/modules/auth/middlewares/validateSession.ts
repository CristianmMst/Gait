import AuthService from "@/modules/auth/authService";
import { NextFunction, Response, Request } from "express";
import { MissingAccessToken } from "@/modules/shared/errors/MissingAccessToken";

const authService = new AuthService();

export const validateSession = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new MissingAccessToken();
    const user = authService.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
  next();
};
