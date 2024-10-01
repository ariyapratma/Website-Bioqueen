import React from "react";

const HeroDetailProduct = ({ product }) => {
  // Tambahkan pengecekan apakah product sudah terdefinisi
  if (!product) {
    return <p>Loading...</p>; // Menampilkan pesan loading jika product belum ada
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row">
        {/* Gambar produk */}
        <div className="lg:w-1/2">
          <img
            src={product.image_url || "/default-image.png"} // Gambar default jika tidak ada
            alt={product.name || "Product Image"} // Tampilkan alt text default jika nama tidak tersedia
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Detail produk */}
        <div className="p-6 lg:w-1/2">
          <h1 className="mb-4 text-3xl font-bold">
            {product.name || "Product Name"} {/* Nama produk */}
          </h1>
          <p className="mb-4 text-lg text-gray-700">
            {product.description || "No description available."}{" "}
            {/* Deskripsi produk */}
          </p>
          <p className="mb-6 text-2xl font-semibold">
            Rp {product.price || "0"} {/* Harga produk */}
          </p>

          {/* Tombol Add to Cart dan Buy Now */}
          <div className="flex space-x-4">
            <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Add to Cart
            </button>
            <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetailProduct;
