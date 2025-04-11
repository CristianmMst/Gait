export class InvalidCredentials extends Error {
  statusCode = 400;

  constructor(message: string = "Credenciales incorrectas") {
    super(message);
    this.name = "Credenciales incorrectas";
  }
}
