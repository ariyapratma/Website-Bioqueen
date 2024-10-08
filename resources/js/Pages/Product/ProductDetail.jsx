import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { usePage, Link, Head } from "@inertiajs/react";
import { useState } from "react";

const ProductDetail = () => {
  const { props } = usePage();
  const { product, auth, category } = props;
  const [quantity, setQuantity] = useState(1); // Menyimpan jumlah barang
  const [totalPrice, setTotalPrice] = useState(product.price); // Menyimpan total harga
  const [cartItems, setCartItems] = useState(0); // Menyimpan jumlah item di cart

  // Update total harga setiap kali jumlah barang berubah
  const updateTotalPrice = (newQuantity) => {
    setTotalPrice(product.price * newQuantity);
  };

  const addToCart = async () => {
    try {
      // Menambah jumlah barang ke cart
      setCartItems((prevItems) => prevItems + quantity);

      // Get CSRF token from meta tag
      const csrfTokenElement = document.querySelector(
        'meta[name="csrf-token"]',
      );
      if (!csrfTokenElement) {
        throw new Error("CSRF token not found");
      }
      const csrfToken = csrfTokenElement.getAttribute("content");

      // Simpan data ke database melalui request AJAX
      const response = await fetch("/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Add CSRF token
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Jika menggunakan token
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity,
          price: product.price * quantity,
        }),
      });

      //   if (!response.ok) {
      //     throw new Error("Network response was not ok");
      //   }

      const result = await response.json();
      // Menggunakan result jika diperlukan
    } catch (error) {
      // Menangani kesalahan tanpa console.error
      alert("Failed to add product to cart. Please try again.");
    }
  };

  const orderNow = () => {
    // Menghilangkan log di sini
    alert(
      `Order for ${product.name} initiated with quantity ${quantity} and total price Rp ${parseFloat(totalPrice).toLocaleString("id-ID")}!`,
    );
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateTotalPrice(newQuantity); // Update total harga
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        updateTotalPrice(newQuantity); // Update total harga
        return newQuantity;
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Head title={`${product.name} | PT Ratu Bio Indonesia`} />
      <Navbar auth={auth} />
      <main className="mb-24 mt-32 flex-grow">
        <div className="container mx-auto p-6 md:p-10 lg:p-14">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500">
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
                <Link
                  href={`/product/${category.slug}`}
                  className="text-gray-600"
                >
                  Product List
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="font-bold text-black">Product Detail</span>
              </li>
            </ul>
          </nav>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Gambar produk */}
            <div className="flex justify-center">
              <div className="rounded-lg p-4 shadow-lg">
                <img
                  src={`/storage/${product.image_url}`}
                  alt={product.name}
                  className="w-full max-w-md rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                  style={{ aspectRatio: "1 / 1" }}
                />
              </div>
            </div>

            {/* Detail produk */}
            <div className="flex flex-col justify-center rounded-lg bg-white p-6 shadow-md">
              <h1 className="text-4xl font-bold text-gray-800">
                {product.name}
              </h1>
              <p className="mt-4 text-gray-600">{product.description}</p>

              {/* Harga total */}
              <p className="mt-4 text-2xl font-bold text-gray-800">
                Rp {parseFloat(totalPrice).toLocaleString("id-ID")}
              </p>

              {/* Kontrol Jumlah Barang */}
              <div className="mt-6 flex items-center space-x-4">
                <button
                  onClick={decreaseQuantity}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-2xl font-medium">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Tombol Add to Cart dan Order Now */}
              <div className="mt-6 flex space-x-4 font-lexend font-medium">
                <button
                  onClick={addToCart}
                  className="flex-1 rounded-lg bg-custom-yellow px-6 py-3 text-black transition duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                >
                  Add to Cart
                </button>
                <button
                  onClick={orderNow}
                  className="flex-1 rounded-lg bg-black px-6 py-3 text-white transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
