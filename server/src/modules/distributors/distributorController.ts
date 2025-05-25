import AuthService from "../auth/authService";
import { NextFunction, Request, Response } from "express";
import EmployeeService from "../employees/employeeService";
import { UserAlreadyExists } from "../shared/errors/UserAlreadyExists";

export class DistributorController {
  private readonly authService = new AuthService();
  private readonly employeeService = new EmployeeService();

  signupEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, lastname, phone, email, password, role } = req.body;
    try {
      const employee = await this.employeeService.findByIdOrEmail(id, email);
      if (employee) throw new UserAlreadyExists();
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
