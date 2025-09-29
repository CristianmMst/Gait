import { z } from "zod";

export const AddProductSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Nombre del producto requerido" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(80, { message: "El nombre no puede exceder 80 caracteres" })
    .trim(),
  price: z
    .string()
    .nonempty({ message: "Precio requerido" })
    .pipe(
      z.coerce
        .number({
          message: "El precio debe ser un número válido",
        })
        .positive({ message: "El precio debe ser mayor a 0" })
        .max(999999.99, { message: "El precio no puede exceder $999,999.99" })
    ),
  discount: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === "") return true;
        const num = Number(val);
        return !isNaN(num) && num >= 0 && num <= 100;
      },
      { message: "El descuento debe ser entre 0 y 100" }
    ),
  description: z
    .string()
    .nonempty({ message: "Descripción requerida" })
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(500, { message: "La descripción no puede exceder 500 caracteres" })
    .trim(),
  stock: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === "") return true;
        const num = Number(val);
        return !isNaN(num) && num >= 0;
      },
      { message: "El stock debe ser un número mayor o igual a 0" }
    ),
  image: z.string().optional(),
  brandId: z
    .string()
    .nonempty({ message: "Marca requerida" })
    .pipe(
      z.coerce
        .number({
          message: "Selecciona una marca válida",
        })
        .positive({ message: "Selecciona una marca válida" })
    ),
  categoryId: z
    .string()
    .nonempty({ message: "Categoría requerida" })
    .pipe(
      z.coerce
        .number({
          message: "Selecciona una categoría válida",
        })
        .positive({ message: "Selecciona una categoría válida" })
    ),
});
