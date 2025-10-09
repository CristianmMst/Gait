import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  if (error instanceof jwt.TokenExpiredError) {
    res.status(401).json({
      message: "El token ha expirado",
    });
  } else if (error instanceof jwt.JsonWebTokenError) {
    res.status(401).json({
      message: "El token no es válido",
    });
  } else {
    res.status(statusCode).json({
      message,
    });
  }
};
