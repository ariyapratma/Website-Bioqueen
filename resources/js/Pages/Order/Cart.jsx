import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("/api/cart"); // Sesuaikan endpoint API kamu
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`/api/cart/remove/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Keranjang Belanja</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Keranjang Anda kosong.</p>
          <Link href="/products" className="text-blue-500 hover:underline">
            Kembali ke produk
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b p-2"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    Harga: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600">Jumlah: {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <h2 className="text-lg font-bold">Total Harga:</h2>
            <p className="text-lg font-semibold">${getTotalPrice()}</p>
          </div>

          <Link
            href="/checkout"
            className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white"
          >
            Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
