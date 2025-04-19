import AuthService from "@/modules/auth/authService";
import { NextFunction, Response, Request } from "express";
import { MissingAccessToken } from "@/modules/shared/errors/MissingAccessToken";

const authService = new AuthService();

export const validateToken = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.query.token;
  try {
    if (!token || typeof token !== "string")
      throw new MissingAccessToken("No tienes permiso para registrarte");
    authService.verifyToken(token);
    next();
  } catch (error) {
    next(error);
  }
};
