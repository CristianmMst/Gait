export class UserNotFound extends Error {
  statusCode = 404;

  constructor(message: string = "Usuario no encontrado") {
    super(message);
    this.name = "Usuario no encontrado";
  }
}
