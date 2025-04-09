import { compareSync, hashSync } from "bcrypt";

class AuthService {
  hashPassword(password: string) {
    return hashSync(password, 8);
  }

  comparePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
}

export default AuthService;
