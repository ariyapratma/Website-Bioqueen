const HeroProduct = () => {
  // Data statis untuk hero section dan produk
  const dataHeroProduct = {
    title: "Produk Unggulan Kami",
    description: "Berikut adalah beberapa produk terbaik yang kami tawarkan.",
    image_url: "/ProductAsset/HeroProduct/HeroImage.png", // Gambar hero
    products: [
      { name: "Produk 1", description: "Deskripsi produk 1" },
      { name: "Produk 2", description: "Deskripsi produk 2" },
      { name: "Produk 3", description: "Deskripsi produk 3" },
      { name: "Produk 4", description: "Deskripsi produk 4" },
      { name: "Produk 5", description: "Deskripsi produk 5" },
      { name: "Produk 6", description: "Deskripsi produk 6" },
      { name: "Produk 7", description: "Deskripsi produk 7" },
      { name: "Produk 8", description: "Deskripsi produk 8" },
      { name: "Produk 9", description: "Deskripsi produk 9" },
      { name: "Produk 10", description: "Deskripsi produk 10" },
      { name: "Produk 11", description: "Deskripsi produk 11" },
      { name: "Produk 12", description: "Deskripsi produk 12" },
      { name: "Produk 13", description: "Deskripsi produk 13" },
      { name: "Produk 14", description: "Deskripsi produk 14" },
      { name: "Produk 15", description: "Deskripsi produk 15" },
      { name: "Produk 16", description: "Deskripsi produk 16" },
      { name: "Produk 17", description: "Deskripsi produk 17" },
    ],
  };

  return (
    <div className="container mx-auto mb-6 p-6">
      {/* Hero Section */}
      <div className="mb-8 flex w-full flex-col overflow-hidden lg:flex-row">
        {/* Text Section */}
        <div className="flex flex-col p-6 lg:w-1/2">
          <h1 className="mb-4 font-lexend text-3xl font-bold text-black sm:text-4xl">
            {dataHeroProduct.title}
          </h1>
          <p className="mb-4 font-lexend font-medium text-gray-600">
            {dataHeroProduct.description}
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {dataHeroProduct.products.length > 0 ? (
          dataHeroProduct.products.slice(0, 17).map((product, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg"
            >
              <img
                src={`/ProductAsset/HeroProduct/Product${index + 1}.png`}
                alt={product.name}
                className="mb-4 h-48 w-full rounded-md object-cover"
              />
              <h3 className="mb-2 text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">
                {product.description || "No description available"}
              </p>
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
