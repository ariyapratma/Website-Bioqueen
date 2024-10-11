import Navbar from "@/Components/Navbar/Navbar";
import { Inertia } from "@inertiajs/inertia";
import Footer from "@/Components/Footer/Footer";
import Swal from "sweetalert2";
import { useState } from "react";

const CartIndex = ({ cartItems, auth }) => {
  const [updatedItems, setUpdatedItems] = useState(cartItems);

  // Menghitung total harga keranjang
  const totalPrice = updatedItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  // Fungsi untuk memperbarui jumlah barang di keranjang
  const updateQuantity = (itemId, quantity) => {
    setUpdatedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item,
      ),
    );
  };

  // Fungsi untuk menyimpan jumlah item ke cart dengan SweetAlert
  const saveCart = (itemId, quantity) => {
    Inertia.put(
      `/carts/${itemId}`,
      { quantity },
      {
        onSuccess: () => {
          Swal.fire("Saved!", "Quantity has been updated.", "success");
        },
        onError: (error) => {
          Swal.fire("Error", "Failed to update quantity.", "error");
        },
      },
    );
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(`/carts/${itemId}`, {
          onSuccess: () => {
            Swal.fire("Deleted!", "The item has been removed.", "success");
          },
          onError: (error) => {
            Swal.fire("Error", "Failed to remove item from cart.", "error");
          },
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-gray-50">
      <Navbar auth={auth} />
      <main className="mb-24 mt-32 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-center font-lexend text-4xl font-bold text-gray-800">
            Your Cart
          </h1>

          {updatedItems.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-left font-lexend text-sm font-semibold uppercase text-gray-600">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="flex items-center px-6 py-4">
                        <img
                          src={`/storage/${item.product?.image_url}`}
                          alt={item.product?.name || "Product not found"}
                          className="mr-4 h-16 w-16 rounded-md border border-gray-200 object-cover"
                        />
                        <div>
                          <p className="font-lexend font-semibold text-gray-900">
                            {item.product?.name || "Product not found"}
                          </p>
                          <p className="text-sm text-gray-500">
                            Category: {item.product?.category?.name || "Unknown"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        Rp {parseFloat(item.price).toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value, 10))
                          }
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-center focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        />
                        <button
                          onClick={() => saveCart(item.id, item.quantity)}
                          className="ml-2 rounded bg-green-500 px-2 py-1 text-white transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                          Save
                        </button>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        Rp{" "}
                        {parseFloat(item.quantity * item.price).toLocaleString(
                          "id-ID",
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded bg-red-500 px-3 py-1 text-white transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between bg-gray-50 p-6">
                <h2 className="font-lexend text-xl font-bold text-gray-800">
                  Total Price: Rp {parseFloat(totalPrice).toLocaleString("id-ID")}
                </h2>
                <button className="rounded bg-yellow-500 px-6 py-2 font-lexend font-semibold text-white transition duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartIndex;
