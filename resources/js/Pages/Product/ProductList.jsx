import { Link, usePage } from "@inertiajs/react";

const ProductList = () => {
  const { props } = usePage();
  const { dataProductList = [] } = props; // Mengambil dataProductList dari props dengan nilai default sebagai array
  const { category, products } = dataProductList; // Mengasumsikan dataProductList berisi category dan products

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-3xl font-bold text-black">
        Products in {category?.name || "Unknown Category"}
      </h1>
      {products && products.length > 0 ? ( // Memastikan products ada sebelum diakses
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-2 text-lg font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}
      <Link href="/product" className="mt-4 inline-block text-blue-500">
        Back to categories
      </Link>
    </div>
  );
};

export default ProductList;
