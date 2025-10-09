import { JWT_SECRET } from "@/config";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  hashPassword(password: string) {
    return hashSync(password, 8);
  }

  comparePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  createToken(payload: jwt.JwtPayload, options: jwt.SignOptions) {
    return jwt.sign(payload, `${JWT_SECRET}`, options);
  }

  verifyToken(token: string) {
    return jwt.verify(token, `${JWT_SECRET}`) as jwt.JwtPayload;
  }
}

export default AuthService;
