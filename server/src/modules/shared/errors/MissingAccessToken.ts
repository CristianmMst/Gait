export class MissingAccessToken extends Error {
  statusCode = 400;

  constructor(message: string = "Falta el token de acceso") {
    super(message);
    this.name = "Falta el token de acceso";
  }
}
