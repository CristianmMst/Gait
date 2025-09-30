import { SearchBar } from "./components/SearchBar";
import { getProducts, getCategories } from "./actions/getProducts";
import { ProductItem } from "./components/ProductItem";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { categoryId, minPrice, maxPrice } = await searchParams;
  console.log(categoryId, minPrice, maxPrice);

  const [products, categories] = await Promise.all([
    getProducts(
      categoryId as string,
      minPrice as unknown as number,
      maxPrice as unknown as number
    ),
    getCategories(),
  ]);

  return (
    <div className="p-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Tienda</h1>
        <p>Encuentra los mejores productos para tu negocio</p>
      </div>
      <SearchBar categories={categories} />
      <div className="grid grid-cols-5 gap-6 mt-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
