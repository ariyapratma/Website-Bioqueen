import Navbar from "@/Components/Navbar/Navbar";
import HeaderProduct from "./HeaderProduct";
import Footer from "@/Components/Footer/Footer";
import { usePage, Head } from "@inertiajs/react";

const ProductList = () => {
  const { props } = usePage();
  const { category, products, auth, dataHeroProduct } = props;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Title dinamis menggunakan category.name */}
      <Head title={`${category.name} | PT Ratu Bio Indonesia`} />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/* HeaderProduct */}
        <HeaderProduct dataHeroProduct={dataHeroProduct} />
        <div className="container mx-auto mb-24 p-6 px-10 py-14">
          <h1 className="mb-4 font-lexend text-3xl font-bold text-black sm:text-4xl">
            {category.name}
          </h1>
          <p className="mb-4 font-lexend font-medium text-gray-600">
            {category.description_categories}
          </p>

          {/* Grid layout with responsive breakpoints */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex h-full cursor-pointer flex-col justify-between rounded-lg bg-white shadow-md hover:bg-gray-100"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={`/storage/${product.image_url}`}
                      alt={product.name}
                      className="w-full rounded-t-lg object-contain"
                      style={{ aspectRatio: "1 / 1" }} // menjaga rasio gambar
                    />
                  </div>
                  {/* Product Content */}
                  <div className="flex flex-col items-center justify-center p-4">
                    <h2 className="line-clamp-1 text-center text-lg font-semibold">
                      {product.name}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-center text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="mt-2 text-center font-lexend text-sm font-semibold text-black">
                      Rp {product.price}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
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
