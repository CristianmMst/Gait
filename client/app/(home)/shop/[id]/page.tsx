import { getProductById } from "../actions/getProducts";
import { ProductDetail } from "./components/ProductDetail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(+id);

  return <ProductDetail product={product} />;
}
