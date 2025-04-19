import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  if (error instanceof TokenExpiredError) {
    res.status(401).json({
      message: "El token ha expirado",
    });
  }
  if (error instanceof JsonWebTokenError) {
    res.status(401).json({
      message: "El token no es válido",
    });
  }

  res.status(statusCode).json({
    message,
  });
};
