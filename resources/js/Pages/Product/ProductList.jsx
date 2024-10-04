import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import HeaderProduct from "./HeaderProduct";
import Footer from "@/Components/Footer/Footer";
import { usePage, Head } from "@inertiajs/react";

const ProductList = () => {
  const { props } = usePage();
  const { category, products, auth } = props;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Title dinamis menggunakan category.name */}
      <Head title={`${category.name} | PT Ratu Bio Indonesia`} />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/*HeaderProduct*/}
        <HeaderProduct />
        <div className="container mx-auto px-6 py-10">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {category.name}
          </h1>
          <p className="mb-6 text-gray-600">
            {category.description_categories}
          </p>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg bg-white p-4 shadow-md"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  <h2 className="mt-2 text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="mt-2 font-bold text-gray-900">
                    {product.price}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-4 text-center text-gray-500">
                No products available in this category.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;
