import { JWT_SECRET } from "@/config";
import { compareSync, hashSync } from "bcrypt";
import { JwtPayload, sign, SignOptions, verify } from "jsonwebtoken";

class AuthService {
  hashPassword(password: string) {
    return hashSync(password, 8);
  }

  comparePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  createToken(payload: JwtPayload, options: SignOptions) {
    return sign(payload, `${JWT_SECRET}`, options);
  }

  verifyToken(token: string) {
    return verify(token, `${JWT_SECRET}`) as JwtPayload;
  }
}

export default AuthService;
