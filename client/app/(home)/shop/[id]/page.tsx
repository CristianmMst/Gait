import {
  getProductById,
  getBrands,
  getCategories,
} from "../actions/getProducts";
import { ProductDetail } from "./components/ProductDetail";
import { verifySession } from "@/app/(auth)/actions/verifySession";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, user, brands, categories] = await Promise.all([
    getProductById(+id),
    verifySession(),
    getBrands(),
    getCategories(),
  ]);

  return (
    <ProductDetail
      product={product}
      user={user}
      brands={brands}
      categories={categories}
    />
  );
}
