import { z } from "zod";

export type FormLoginState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Correo electrónico requerido" })
    .pipe(
      z
        .string()
        .email({
          message: "Correo electrónico no válido",
        })
        .trim(),
    ),
  password: z.string().nonempty({ message: "Contraseña requerida" }).trim(),
});
