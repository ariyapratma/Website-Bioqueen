import React from "react";
import { Link } from "@inertiajs/react";

const HeroProductList = ({ category, products = [] }) => {
  // Tambahkan default array kosong
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">{category}</h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <Link href={`/categories/product/${product.id}`} key={product.id}>
              <div className="rounded-lg bg-white p-4 shadow-md">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-lg">{product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default HeroProductList;
