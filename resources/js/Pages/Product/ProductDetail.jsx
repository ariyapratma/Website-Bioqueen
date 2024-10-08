import Navbar from "@/Components/Navbar/Navbar";
import HeaderProduct from "./HeaderProduct";
import Footer from "@/Components/Footer/Footer";
import { usePage, Head } from "@inertiajs/react";

const ProductDetail = () => {
  const { props } = usePage();
  const { product, auth, category, dataHeroProduct } = props;

  const addToCart = () => {
    console.log(`Product ${product.name} added to cart!`);
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Head title={`${product.name} | PT Ratu Bio Indonesia`} />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/* HeaderProduct */}
        <HeaderProduct dataHeroProduct={dataHeroProduct} />
        <div className="container mx-auto p-6 md:p-10 lg:p-14">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Gambar produk */}
            <div className="flex justify-center">
              <img
                src={`/storage/${product.image_url}`}
                alt={product.name}
                className="w-full max-w-md rounded-lg object-cover shadow-lg"
                style={{ aspectRatio: "1 / 1" }}
              />
            </div>

            {/* Detail produk */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-800">
                {product.name}
              </h1>
              <p className="mt-4 text-gray-600">{product.description}</p>
              <p className="mt-4 text-2xl font-bold text-gray-800">
                Rp {product.price.toLocaleString("id-ID")}
              </p>

              {/* Tombol Add to Cart */}
              <button
                onClick={addToCart}
                className="mt-6 rounded-lg bg-yellow-500 px-6 py-3 text-white transition duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
