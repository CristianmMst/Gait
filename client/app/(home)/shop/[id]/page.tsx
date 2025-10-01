import { getProductById } from "../actions/getProducts";
import { ProductDetail } from "./components/ProductDetail";
import { verifySession } from "@/app/(auth)/actions/verifySession";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(+id);
  const user = await verifySession();

  return <ProductDetail product={product} user={user} />;
}
