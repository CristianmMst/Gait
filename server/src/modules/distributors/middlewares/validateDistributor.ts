import AuthService from "@/modules/auth/authService";
import { NextFunction, Response, Request } from "express";
import DistributorService from "../distributorService";

const authService = new AuthService();
const distributorService = new DistributorService();

export const validateDistributor = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) throw new Error("Falta el token de acceso");
    const { id } = authService.verifyToken(token);
    const distributor = await distributorService.findOneById(id);
    if (!distributor) throw new Error("Usuario no encontrado");
    req.distributor = distributor;
    next();
  } catch (error) {
    next(error);
  }
};
