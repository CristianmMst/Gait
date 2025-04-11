import AuthService from "./authService";
import { NextFunction, Request, Response } from "express";
import DistributorService from "../distributors/distributorService";

class AuthController {
  private authService = new AuthService();
  private distributorService = new DistributorService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, email, password, location } = req.body;
    console.log(id, name, email, password, location);

    try {
      res.status(200).send({ message: "Login exitoso" });
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, email, password, location } = req.body;
    try {
      const distributor = await this.distributorService.findOneById(id);
      if (distributor) {
        throw new Error("El distribuidor ya existe");
      }

      const hashedPassword = this.authService.hashPassword(password);
      await this.distributorService.create({
        id,
        name,
        email,
        location,
        employees: [],
        password: hashedPassword,
      });
      res.status(200).send({ message: "Registro exitoso" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
