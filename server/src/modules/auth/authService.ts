import { JWT_SECRET } from "@/config";
import { compareSync, hashSync } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";

class AuthService {
  hashPassword(password: string) {
    return hashSync(password, 8);
  }

  comparePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  createToken(id: number, email: string) {
    return sign({ id, email }, `${JWT_SECRET}`, {
      expiresIn: "1h",
    });
  }

  verifyToken(token: string) {
    return verify(token, `${JWT_SECRET}`) as JwtPayload;
  }
}

export default AuthService;
