"use client";

import { useState, useEffect } from "react";
import { Upload, X, Save } from "lucide-react";
import { Card } from "./components/Card";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextArea from "./components/FormTextArea";
import ButtonSubmit from "./components/ButtonSubmit";
import {
  getBrands,
  getCategories,
  type Brand,
  type Category,
} from "../../shop/actions/getProducts";
import { createProductAction } from "../actions/createProduct";
import { FormState } from "@/lib/definitions";

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    discount: "",
    description: "",
    stock: "",
    brandId: "",
    categoryId: "",
  });
  const [state, setState] = useState<FormState>(undefined);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [brandsData, categoriesData] = await Promise.all([
          getBrands(),
          getCategories(),
        ]);
        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading brands and categories:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (state?.success) {
      setImages([]);
      setFormValues({
        name: "",
        price: "",
        discount: "",
        description: "",
        stock: "",
        brandId: "",
        categoryId: "",
      });
    }
  }, [state?.success]);

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setState(undefined);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await createProductAction(undefined, formData);
      setState(result);

      if (result?.success) {
        setFormValues({
          name: "",
          price: "",
          discount: "",
          description: "",
          stock: "",
          brandId: "",
          categoryId: "",
        });
        setImages([]);
      } else {
        setFormValues({
          name: (formData.get("name") as string) || "",
          price: (formData.get("price") as string) || "",
          discount: (formData.get("discount") as string) || "",
          description: (formData.get("description") as string) || "",
          stock: (formData.get("stock") as string) || "",
          brandId: (formData.get("brandId") as string) || "",
          categoryId: (formData.get("categoryId") as string) || "",
        });
      }
    } catch (error) {
      setState({
        message: "Error de conexión. Intenta nuevamente.",
      });
      setFormValues({
        name: (formData.get("name") as string) || "",
        price: (formData.get("price") as string) || "",
        discount: (formData.get("discount") as string) || "",
        description: (formData.get("description") as string) || "",
        stock: (formData.get("stock") as string) || "",
        brandId: (formData.get("brandId") as string) || "",
        categoryId: (formData.get("categoryId") as string) || "",
      });
    } finally {
      setPending(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages((prev) => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Crear Producto
        </h1>
        <p className="text-muted-foreground">
          Agrega un nuevo producto al catálogo con toda la información necesaria
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card title="Información Básica">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="name"
              label="Nombre del Producto"
              placeholder="Ej: Limpiador de plásticos 650ml"
              value={formValues.name}
              onChange={handleInputChange}
              error={state?.errors?.name}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                name="brandId"
                label="Marca"
                options={brands}
                value={formValues.brandId}
                onChange={handleInputChange}
                error={state?.errors?.brandId}
                required
              />

              <FormSelect
                name="categoryId"
                label="Categoría"
                options={categories}
                value={formValues.categoryId}
                onChange={handleInputChange}
                error={state?.errors?.categoryId}
                required
              />
            </div>
          </div>
        </Card>

        <Card title="Precios y Stock">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              name="price"
              type="number"
              label="Precio"
              placeholder="0.00"
              value={formValues.price}
              onChange={handleInputChange}
              error={state?.errors?.price}
              required
            />

            <FormInput
              name="discount"
              type="number"
              label="Descuento (%)"
              placeholder="0"
              value={formValues.discount}
              onChange={handleInputChange}
              error={state?.errors?.discount}
            />

            <FormInput
              name="stock"
              type="number"
              label="Stock inicial"
              placeholder="0"
              value={formValues.stock}
              onChange={handleInputChange}
              error={state?.errors?.stock}
            />
          </div>
        </Card>

        <Card title="Imagen del Producto">
          <input type="hidden" name="image" value={images[0] || ""} />

          <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8 text-center mt-8">
            <input
              multiple
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                Haz clic para subir imágenes o arrastra y suelta
              </p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG, WEBP hasta 10MB cada una
              </p>
            </label>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Producto ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full p-1"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {state?.errors?.image && (
            <span className="text-sm text-red-500 mt-2 block">
              {state.errors.image[0]}
            </span>
          )}
        </Card>

        <Card title="Descripción y Especificaciones">
          <FormTextArea
            name="description"
            label="Descripción del Producto"
            placeholder="Describe las características principales del producto..."
            value={formValues.description}
            onChange={handleInputChange}
            error={state?.errors?.description}
            required
            rows={4}
          />
        </Card>

        <div className="flex items-center justify-between">
          <div>
            {state?.message && (
              <p
                className={`text-sm ${
                  state.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {state.message}
              </p>
            )}
          </div>

          <ButtonSubmit pending={pending}>
            <Save className="h-4 w-4 mr-2" />
            Crear Producto
          </ButtonSubmit>
        </div>
      </form>
    </div>
  );
}
