import AuthService from "./authService";
import { NextFunction, Request, Response } from "express";
import EmployeeService from "../employees/employeeService";
import DistributorService from "../distributors/distributorService";

enum TYPE_USERS {
  EMPLOYEE = "EMPLOYEE",
  DISTRIBUTOR = "DISTRIBUTOR",
}

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
        throw new Error("Usuario no encontrado");
      }

      if (employee) {
        const isPasswordCorrect = this.authService.comparePassword(
          password,
          employee.password,
        );
        if (!isPasswordCorrect) {
          throw new Error("Contraseña incorrecta");
        }
        const token = this.authService.createToken(employee.id, email);
        res.cookie("accessToken", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res
          .status(200)
          .send({ token, type: TYPE_USERS.EMPLOYEE, role: employee.role });
      }
      if (distributor) {
        const isPasswordCorrect = this.authService.comparePassword(
          password,
          distributor.password,
        );
        if (!isPasswordCorrect) {
          throw new Error("Contraseña incorrecta");
        }
        const token = this.authService.createToken(distributor.id, email);
        res.cookie("accessToken", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.status(200).send({ token, type: TYPE_USERS.DISTRIBUTOR });
      }
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
