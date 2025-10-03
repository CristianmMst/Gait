import AuthService from "@/modules/auth/authService";
import EmployeeService from "@/modules/employees/employeeService";
import { NextFunction, Response, Request } from "express";
import { MissingAccessToken } from "@/modules/shared/errors/MissingAccessToken";
import { TYPE_USERS } from "@/modules/auth/enums";

const authService = new AuthService();
const employeeService = new EmployeeService();

export const validateSession = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new MissingAccessToken();
    const user = authService.verifyToken(token);

    if (user.type === TYPE_USERS.EMPLOYEE && !user.distributorId) {
      const employee = await employeeService.findOneByEmail(user.email);
      if (employee && employee.distributor) {
        user.distributorId = employee.distributor.id;
      }
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
