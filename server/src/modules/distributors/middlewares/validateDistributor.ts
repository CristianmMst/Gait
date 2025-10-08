import AuthService from "@/modules/auth/authService";
import { NextFunction, Response, Request } from "express";
import DistributorService from "../distributorService";
import { UserNotFound } from "@/modules/shared/errors/UserNotFound";
import { MissingAccessToken } from "@/modules/shared/errors/MissingAccessToken";
import EmployeeService from "@/modules/employees/employeeService";

const authService = new AuthService();
const distributorService = new DistributorService();
const employeeService = new EmployeeService();

const ADMIN_ROLE_ID = 1;

export const validateDistributor = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new MissingAccessToken();
    }

    const { id } = authService.verifyToken(token);

    const [distributor, employee] = await Promise.all([
      distributorService.findOneById(id),
      employeeService.findOneById(id),
    ]);

    const isValidEmployee = employee && employee.role.id === ADMIN_ROLE_ID;

    if (!distributor && !isValidEmployee) {
      throw new UserNotFound();
    }

    req.distributor = distributor ?? employee?.distributor;

    next();
  } catch (error) {
    next(error);
  }
};
