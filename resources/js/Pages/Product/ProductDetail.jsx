import Navbar from "@/Components/Navbar/Navbar";
import Swal from "sweetalert2";
import Footer from "@/Components/Footer/Footer";
import { usePage, Link, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { props } = usePage();
  const { product, auth, category } = props;
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
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
          console.error(`Failed to fetch cart items: ${response.status} ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setCartItems(data.length);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

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
        Swal.fire("Success", result.message, "success");
      } else {
        Swal.fire("Error", result.error || "Something went wrong", "error");
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      Swal.fire("Error", "Failed to add product to cart", "error");
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
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        updateTotalPrice(newQuantity);
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

              {/* Tombol Add to Cart */}
              <div className="mt-6 flex space-x-4 font-lexend font-semibold">
                <button
                  onClick={addToCart}
                  className="w-full rounded-lg bg-custom-yellow py-3 font-semibold text-black transition hover:bg-yellow-600"
                >
                  Add to Cart
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
