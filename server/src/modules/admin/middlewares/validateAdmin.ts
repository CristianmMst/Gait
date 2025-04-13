import AuthService from "@/modules/auth/authService";
import AdminService from "../adminServices";
import { NextFunction, Response, Request } from "express";
import { UserNotFound } from "@/modules/shared/errors/UserNotFound";
import { MissingAccessToken } from "@/modules/shared/errors/MissingAccessToken";

const authService = new AuthService();
const adminService = new AdminService();

export const validateAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) throw new MissingAccessToken();
    const { id } = authService.verifyToken(token);
    const admin = await adminService.findOneById(id);
    if (!admin) throw new UserNotFound();
    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};
