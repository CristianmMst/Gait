"use client";

import type React from "react";

import { useState } from "react";
import { Upload, X, Save, Eye } from "lucide-react";
import { Label } from "./components/Label";
import { Card } from "./components/Card";
import { Input } from "./components/Input";

const categories = [
  "Electrónicos",
  "Audio",
  "Computadoras",
  "Wearables",
  "Tablets",
  "Fotografía",
  "Hogar",
  "Deportes",
  "Moda",
  "Salud",
];

const brands = [
  "TechCorp",
  "AudioMax",
  "GameTech",
  "HealthTech",
  "TabletCorp",
  "PhotoPro",
  "SmartHome",
  "SportsPro",
  "FashionTech",
  "WellnessTech",
];

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    originalPrice: "",
    discount: "",
    description: "",
    specifications: "",
    inStock: true,
    featured: false,
  });

  const [images, setImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Producto creado:", { ...formData, images });
    // Aquí iría la lógica para enviar el producto al backend
  };

  const calculateDiscount = () => {
    if (formData.price && formData.originalPrice) {
      const price = Number.parseFloat(formData.price);
      const originalPrice = Number.parseFloat(formData.originalPrice);
      if (originalPrice > price) {
        const discount = Math.round(
          ((originalPrice - price) / originalPrice) * 100
        );
        setFormData((prev) => ({ ...prev, discount: discount.toString() }));
      }
    }
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
        {/* Basic Information */}
        <Card title="Información Básica">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Limpiador de plásticos 650ml"
              />
            </div>
            <div className="flex gap-x-4">
              <div className="space-y-4">
                <Label htmlFor="brand">Marca *</Label>
                <select
                  id="brand"
                  value={formData.brand}
                  title="Selecciona una marca"
                  className="p-2 border border-zinc-800 rounded-md text-zinc-500"
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <Label htmlFor="category">Categoría *</Label>
                <select
                  id="category"
                  title="Selecciona una categoría"
                  value={formData.category}
                  className="p-2 border border-zinc-800 rounded-md text-zinc-500"
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card title="Precios">
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="price">Precio *</label>
              <Input
                name="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="discount">Descuento (%)</label>
              <Input
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>
        </Card>

        {/* Images */}
        <Card title="Imagen del Producto">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Producto ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Description */}
        <Card title="Descripción y Especificaciones">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="description">Descripción del Producto *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe las características principales del producto..."
              rows={4}
              required
              className="w-full p-2 border-zinc-800 border rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50"
            />
          </div>
        </Card>
        <button
          type="submit"
          className="flex items-center p-2 rounded-md justify-self-end bg-primary hover:bg-primary/90 cursor-pointer"
          onClick={handleSubmit}
        >
          <Save className="h-4 w-4 mr-2" />
          Crear Producto
        </button>
      </form>
    </div>
  );
}
