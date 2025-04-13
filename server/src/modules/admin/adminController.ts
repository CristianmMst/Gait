import { TYPE_USERS } from "../auth/enums";
import AdminService from "./adminServices";
import AuthService from "../auth/authService";
import { NextFunction, Request, Response } from "express";
import { UserNotFound } from "../shared/errors/UserNotFound";
import { InvalidCredentials } from "../shared/errors/InvalidCredentials";

export class AdminController {
  private readonly authService = new AuthService();
  private readonly adminService = new AdminService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const admin = await this.adminService.findOneByEmail(email);
      if (!admin) throw new UserNotFound();
      const isPasswordCorrect = this.authService.comparePassword(
        password,
        admin.password,
      );
      if (!isPasswordCorrect) throw new InvalidCredentials();
      const token = this.authService.createToken(
        { id: admin.id },
        { expiresIn: "2d" },
      );
      res.cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      res.status(200).send({ token, type: TYPE_USERS.ADMIN });
    } catch (error) {
      next(error);
    }
  };

  generateToken = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const token = this.authService.createToken(
        {
          invite: true,
          type: "REGISTER_USER",
        },
        { expiresIn: "15m" },
      );
      res.status(200).send({ token });
    } catch (error) {
      next(error);
    }
  };
}
