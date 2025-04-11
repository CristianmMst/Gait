import AuthService from "@/modules/auth/authService";
import { NextFunction, Response, Request } from "express";
import DistributorService from "../distributorService";
import { UserNotFound } from "@/modules/shared/errors/UserNotFound";
import { MissingAccessToken } from "@/modules/shared/errors/MissingAccessToken";

const authService = new AuthService();
const distributorService = new DistributorService();

export const validateDistributor = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) throw new MissingAccessToken();
    const { id } = authService.verifyToken(token);
    const distributor = await distributorService.findOneById(id);
    if (!distributor) throw new UserNotFound();
    req.distributor = distributor;
    next();
  } catch (error) {
    next(error);
  }
};
