import Navbar from "@/Components/Navbar/Navbar";
import Swal from "sweetalert2";
import Footer from "@/Components/Footer/Footer";
import { usePage, Link, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { props } = usePage();
  const { product, auth, category } = props;
  const [quantity, setQuantity] = useState(200);
  const [totalPrice, setTotalPrice] = useState(product.price * 200);
  const [cartItems, setCartItems] = useState(0);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("/cart/items", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content"),
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.error(
          `Failed to fetch cart items: ${response.status} ${response.statusText}`,
        );
        return;
      }
      const data = await response.json();
      setCartItems(data.length);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const updateTotalPrice = (newQuantity) => {
    setTotalPrice(product.price * newQuantity);
  };

  const addToCart = async () => {
    try {
      const response = await fetch("/cart/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content"),
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: quantity,
          price: product.price,
        }),
        credentials: "same-origin",
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: result.message,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        });
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        Swal.fire({
          title: "Error!",
          text: result.error || "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        });
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add product to cart",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
        scrollbarPadding: false,
        backdrop: false,
      });
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateTotalPrice(newQuantity);
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 200) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        updateTotalPrice(newQuantity);
        return newQuantity;
      });
    } else {
      Swal.fire({
        title: "Minimum Quantity Reached!",
        text: "The minimum quantity allowed is 200.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
        scrollbarPadding: false,
        backdrop: false,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head title={`${product.name} | PT Ratu Bio Indonesia`} />
      <Navbar auth={auth} />
      <main className="container mx-auto mt-24 mb-24 px-6 md:px-10 lg:px-14">

        {/* Single Card Layout */}
        <div className="rounded-lg -6 md:p-8 lg:p-10">
           {/* Breadcrumb */}
        <nav className="mb-8 flex justify-center space-x-2 text-sm font-medium text-gray-600">
          <Link href="/" className="transition duration-200 hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/product" className="transition duration-200 hover:text-gray-900">
            Product Category
          </Link>
          <span>/</span>
          <Link
            href={`/product/${category.slug}`}
            className="transition duration-200 hover:text-gray-900"
          >
            Product List
          </Link>
          <span>/</span>
          <span className="font-bold text-black">Product Detail</span>
        </nav>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Gambar Produk */}
            <div className="flex justify-center">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={`/storage/${product.image_url}`}
                  alt={product.name}
                  className="w-full max-w-md rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                  style={{ aspectRatio: "1 / 1" }}
                />
              </div>
            </div>

            {/* Detail Produk */}
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>

              {/* Harga Total */}
              <p className="text-2xl font-bold text-gray-900">
                Rp {parseFloat(totalPrice).toLocaleString("id-ID")}
              </p>

              {/* Kontrol Jumlah Barang */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={decreaseQuantity}
                  className="bg-whitetext-black rounded-lg px-3 py-1 text-lg font-bold text-gray-700 shadow-md hover:bg-gray-300 focus:outline-none"
                >
                  -
                </button>
                <span className="text-2xl font-medium text-gray-900">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="bg-whitetext-black rounded-lg px-3 py-1 text-lg font-bold text-gray-700 shadow-md hover:bg-gray-300 focus:outline-none"
                >
                  +
                </button>
              </div>

              {/* Informasi Minimum Order */}
              <p className="text-sm text-red-500 font-semibold">Minimum order quantity is 200.</p>

              {/* Tombol Add to Cart */}
              <button
                onClick={addToCart}
                className="w-full rounded-lg bg-black px-6 py-3 text-center text-lg font-bold text-white transition hover:bg-gray-800 focus:outline-none md:w-48"
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