import AuthService from "../auth/authService";
import { NextFunction, Request, Response } from "express";
import EmployeeService from "../employees/employeeService";

export class DistributorController {
  private readonly authService = new AuthService();
  private readonly employeeService = new EmployeeService();

  registerEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id, name, lastname, phone, email, password, role } = req.body;
    try {
      const hashedPassword = this.authService.hashPassword(password);
      await this.employeeService.create({
        id,
        name,
        lastname,
        phone,
        email,
        state: 0,
        password: hashedPassword,
        role,
        distributor: req.distributor.id,
      });
      res.status(200).send({ message: "Registro exitoso" });
    } catch (error) {
      next(error);
    }
  };
}
