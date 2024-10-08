import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { usePage, Link, Head, router } from "@inertiajs/react";

const handleProductClick = (categorySlug, productSlug) => {
  router.get(`/product/${categorySlug}/${productSlug}`);
};

const ProductList = () => {
  const { props } = usePage();
  const { category, products, auth, dataHeaderProduct } = props;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Title dinamis menggunakan category.name */}
      <Head title={`${category.name} | PT Ratu Bio Indonesia`} />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/* HeaderProduct */}
        <div className="relative h-[30rem] w-full overflow-hidden">
          {/* Conditional rendering for image */}
          {dataHeaderProduct?.image_url ? (
            <img
              src={`/storage/header_product/HeaderProduct.png`}
              loading="lazy"
              className="h-full w-full object-cover"
              alt={dataHeaderProduct.title || "Header Product"}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <p className="font-lexend text-2xl font-medium text-red-500">
                No image available.
              </p>
            </div>
          )}

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-40 px-6 pt-6 sm:px-12 md:px-24 lg:px-36 xl:px-48">
            <h2 className="mb-4 pt-40 font-lexend text-5xl font-bold text-white">
              {dataHeaderProduct?.title || "No title available."}
            </h2>
            <p className="text-md max-w-md font-lexend font-bold text-white">
              {dataHeaderProduct?.description || "No description available."}
            </p>
          </div>
        </div>

        {/* Konten Kategori */}
        <div className="container mx-auto mb-24 p-6 px-10 py-14">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-gray-500">
            <ul className="flex space-x-2 font-lexend font-medium">
              <li>
                <Link href="/" className="text-gray-600">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/product" className="text-gray-600">
                  Product Category
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="font-bold text-black">Product List</span>
              </li>
            </ul>
          </nav>
          <h1 className="mb-4 font-lexend text-3xl font-bold text-black sm:text-4xl">
            {category.name}
          </h1>
          <p className="mb-4 font-lexend font-medium text-gray-600">
            {category.description_categories}
          </p>

          {/* Grid layout dengan breakpoints responsif */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex h-full cursor-pointer flex-col justify-between rounded-lg bg-white shadow-md hover:bg-gray-100"
                  onClick={() =>
                    handleProductClick(category.slug, product.slug)
                  }
                >
                  {/* Gambar Produk */}
                  <div className="flex-shrink-0">
                    <img
                      src={`/storage/${product.image_url}`}
                      alt={product.name}
                      className="w-full rounded-t-lg object-contain"
                      style={{ aspectRatio: "1 / 1" }}
                    />
                  </div>
                  {/* Konten Produk */}
                  <div className="flex flex-col items-center justify-center p-4">
                    <h2 className="line-clamp-1 text-center text-lg font-semibold">
                      {product.name}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-center text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="mt-2 text-center font-lexend text-sm font-semibold text-black">
                      Rp {parseFloat(product.price).toLocaleString("id-ID")}
                      {/* Format harga */}
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
