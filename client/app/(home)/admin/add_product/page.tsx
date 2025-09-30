import { AddProductForm } from "./components/AddProductForm";
import { getBrands, getCategories } from "../../shop/actions/getProducts";

export default async function AddProductPage() {
  const [brands, categories] = await Promise.all([
    getBrands(),
    getCategories(),
  ]);

  return (
    <AddProductForm initialBrands={brands} initialCategories={categories} />
  );
}
