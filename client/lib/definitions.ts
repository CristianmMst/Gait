export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        name?: string[];
        price?: string[];
        discount?: string[];
        description?: string[];
        stock?: string[];
        image?: string[];
        brandId?: string[];
        categoryId?: string[];
        id?: string[];
        lastname?: string[];
        role?: string[];
        phone?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
