import { z } from "zod";

export const RegisterStepOneSchema = z.object({
  nit: z
    .string({
      required_error: "NIT requerido",
    })
    .min(9, {
      message: "NIT debe tener 9 dígitos",
    }),
  name: z.string().nonempty({ message: "Nombre requerido" }).trim(),
  location: z.string().nonempty({ message: "Ubicación requerida" }).trim(),
});

export const RegisterStepTwoSchema = z.object({
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
