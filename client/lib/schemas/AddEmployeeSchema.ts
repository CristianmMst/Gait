import { z } from "zod";
import { ROLE } from "@/app/shared/enums/user";

export const AddEmployeeSchema = z.object({
  id: z
    .string()
    .nonempty({ message: "Cédula requerido" })
    .pipe(z.string().min(10, { message: "Cédula inválida" })),
  name: z.string().nonempty({ message: "Nombre requerido" }).trim(),
  lastname: z.string().nonempty({ message: "Apellido requerido" }).trim(),
  role: z.enum([ROLE.ADMIN, ROLE.MODERATOR, ROLE.VIEWER], {
    message: "Rol requerido",
  }),
  phone: z
    .string()
    .nonempty({ message: "Número de teléfono requerido" })
    .pipe(
      z
        .string()
        .min(10, {
          message: "Número de teléfono inválido",
        })
        .trim(),
    ),
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
