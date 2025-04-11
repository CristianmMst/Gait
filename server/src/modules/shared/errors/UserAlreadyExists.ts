export class UserAlreadyExists extends Error {
  statusCode = 400;

  constructor(message: string = "Usuario ya existe") {
    super(message);
    this.name = "Usuario ya existe";
  }
}
