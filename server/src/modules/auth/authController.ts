import AuthService from "./authService";
import { NextFunction, Request, Response } from "express";
import EmployeeService from "../employees/employeeService";
import DistributorService from "../distributors/distributorService";

import { TYPE_USERS } from "./enums";
import { UserNotFound } from "../shared/errors/UserNotFound";
import { InvalidCredentials } from "../shared/errors/InvalidCredentials";
import { UserAlreadyExists } from "../shared/errors/UserAlreadyExists";

class AuthController {
  private readonly authService = new AuthService();
  private readonly employeeService = new EmployeeService();
  private readonly distributorService = new DistributorService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const employee = await this.employeeService.findOneByEmail(email);
      const distributor = await this.distributorService.findOneByEmail(email);
      if (!distributor && !employee) {
        throw new UserNotFound();
      }

      if (employee) {
        const isPasswordCorrect = this.authService.comparePassword(
          password,
          employee.password
        );
        if (!isPasswordCorrect) {
          throw new InvalidCredentials();
        }

        const token = this.authService.createToken(
          {
            id: employee.id,
            email,
            name: employee.name,
            type: TYPE_USERS.EMPLOYEE,
            role: employee.role.name,
            distributorId: employee.distributor?.id,
          },
          { expiresIn: "7d" }
        );
        res.cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res
          .status(200)
          .send({ token, type: TYPE_USERS.EMPLOYEE, role: employee.role });
      }
      if (distributor) {
        const isPasswordCorrect = this.authService.comparePassword(
          password,
          distributor.password
        );
        if (!isPasswordCorrect) {
          throw new InvalidCredentials();
        }
        const token = this.authService.createToken(
          {
            id: distributor.id,
            email,
            name: distributor.name,
            role: "ADMIN",
            type: TYPE_USERS.DISTRIBUTOR,
          },
          { expiresIn: "7d" }
        );
        res.cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.status(200).send({ token, type: TYPE_USERS.DISTRIBUTOR });
      }
    } catch (error) {
      next(error);
    }
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, email, password, location } = req.body;
    try {
      const distributor = await this.distributorService.findOneById(id);
      if (distributor) {
        throw new UserAlreadyExists();
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

  verifySession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      res.status(200).send({ user });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
