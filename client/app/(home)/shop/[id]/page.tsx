import { getProductById } from "../actions/getProducts";
import { ProductDetail } from "./components/ProductDetail";
import { verifySession } from "@/app/(auth)/actions/verifySession";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, user] = await Promise.all([
    getProductById(+id),
    verifySession(),
  ]);

  return <ProductDetail product={product} userType={user?.type} />;
}
