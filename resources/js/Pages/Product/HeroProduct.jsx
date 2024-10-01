import React, { useState } from "react";

const HeroProduct = () => {
  // Data untuk kategori dan produk
  const categories = [
    { id: 1, name: "Hand Soap" },
    { id: 2, name: "Desinfektan" },
    { id: 3, name: "Hand Sanitizer" },
    { id: 4, name: "Immune Booster" },
    { id: 5, name: "Minyak Kayu Putih" },
    { id: 6, name: "Reo Essentials" },
  ];

  const products = {
    "Hand Soap": [
      { name: "Hand Soap 1", description: "Starts from Rp 100.000", image: "/ProductAsset/HeroProduct/Product1.png" },
      { name: "Hand Soap 2", description: "Starts from Rp 100.000", image: "/ProductAsset/HeroProduct/Product2.png" },
    ],
    "Desinfektan": [
      { name: "Desinfektan 1", description: "Starts from Rp 100.000", image: "/ProductAsset/HeroProduct/Product3.png" },
    ],
    "Hand Sanitizer": [
      { name: "Hand Sanitizer 1", description: "Starts from Rp 100.000", image: "/ProductAsset/HeroProduct/Product4.png" },
      { name: "Hand Sanitizer 2", description: "Starts from Rp 100.000", image: "/ProductAsset/HeroProduct/Product5.png" },
    ],
    "Immune Booster": [
      { name: "Immune Booster 1", description: "Starts from Rp 100.000", image: "/ProductAsset/HeroProduct/Product6.png" },
    ],
    "Minyak Kayu Putih": [
      { name: "Minyak Kayu Putih 1", description: "Starts from Rp 100.000", image: "/ProductAsset/HeroProduct/Product7.png" },
    ],
    "Reo Essentials": [
      { name: "Reo Essentials 1", description: "Starts from Rp 100.000", image: "/ProductAsset/HeroProduct/Product8.png" },
    ],
  };

  // State untuk menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  return (
    <div className="container mx-auto mb-6 p-6">
      {/* Hero Section */}
      <div className="mb-8 flex w-full flex-col overflow-hidden lg:flex-row">
        {/* Text Section */}
        <div className="flex flex-col p-6 lg:w-1/2">
          <h1 className="mb-4 font-lexend text-3xl font-bold text-black sm:text-4xl">
            Produk Unggulan Kami
          </h1>
          <p className="mb-4 font-lexend font-medium text-gray-600">
            Berikut adalah beberapa produk terbaik yang kami tawarkan.
          </p>
        </div>
      </div>

      {/* Category Selection */}
      <div className="mb-8 flex justify-center space-x-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-lg text-white font-medium ${
              selectedCategory === category.name ? "bg-blue-600" : "bg-gray-400"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products[selectedCategory] && products[selectedCategory].length > 0 ? (
          products[selectedCategory].map((product, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mb-4 h-48 w-full rounded-md object-cover"
              />
              <h3 className="text-md mb-2 whitespace-nowrap font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">
                {product.description || "No description available"}
              </p>
              {/* Add To Cart and Buy Now Buttons */}
              <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Add to Cart
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroProduct;
