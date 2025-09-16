import { config } from "@/lib/config";
import { ROLE } from "@/app/shared/enums/user";
import { FormState } from "@/lib/definitions";
import { AddEmployeeSchema } from "@/lib/schemas/AddEmployeeSchema";

export const addEmployee = async (_state: FormState, formData: FormData) => {
  const validatedFields = AddEmployeeSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    lastname: formData.get("lastname"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const role =
    formData.get("role") === ROLE.ADMIN
      ? 1
      : formData.get("role") === ROLE.MODERATOR
      ? 2
      : 3;

  const response = await fetch(
    `${config.serverUrl}/distributors/signup_employee`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: formData.get("id"),
        name: formData.get("name"),
        lastname: formData.get("lastname"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: role,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      message: data.message,
    };
  }
  return {
    success: true,
  };
};
