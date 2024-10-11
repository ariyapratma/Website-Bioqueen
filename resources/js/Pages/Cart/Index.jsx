import Navbar from "@/Components/Navbar/Navbar";
import { Inertia } from "@inertiajs/inertia";
import Footer from "@/Components/Footer/Footer";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";

const CartIndex = ({ cartItems, auth, user }) => {
  const [updatedItems, setUpdatedItems] = useState(cartItems);

  const totalPrice = updatedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const updateQuantity = (itemId, quantity) => {
    const updated = updatedItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item,
    );
    setUpdatedItems(updated);
  };

  const saveCart = (itemId) => {
    const itemToSave = updatedItems.find((item) => item.id === itemId);
    if (itemToSave) {
      Inertia.put(
        `/carts/${itemId}`,
        { quantity: itemToSave.quantity },
        {
          onSuccess: () => {
            Swal.fire("Saved!", "Quantity has been updated.", "success");
          },
          onError: () => {
            Swal.fire("Error", "Failed to update quantity.", "error");
          },
        },
      );
    }
  };

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
            setUpdatedItems((prevItems) =>
              prevItems.filter((item) => item.id !== itemId),
            );
            Swal.fire("Deleted!", "The item has been removed.", "success");
          },
          onError: () => {
            Swal.fire("Error", "Failed to remove item from cart.", "error");
          },
        });
      }
    });
  };

  useEffect(() => {
    setUpdatedItems(cartItems);
  }, [cartItems]);

  return (
    <div className="flex min-h-screen flex-col">
      <Head
        title={`Cart ${auth.user.username || "User"} | PT Ratu Bio Indonesia`}
      />
      <Navbar auth={auth} />
      <main className="flex-grow py-32">
        <div className="container mx-auto mb-24 px-4">
          <h1 className="mb-8 text-center font-lexend text-4xl font-bold text-gray-800">
            Your Cart
          </h1>

          {updatedItems.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg bg-white font-lexend shadow-lg">
              <table className="min-w-full border-collapse">
                <thead className="bg-custom-yellow text-left text-sm font-medium text-black">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedItems.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="flex items-center px-6 py-4">
                        <img
                          src={`/storage/${item.product?.image_url}`}
                          alt={item.product?.name}
                          className="h-16 w-16 rounded object-cover"
                        />
                        <span className="ml-4 text-sm font-medium text-gray-800">
                          {item.product?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        Rp {parseFloat(item.price).toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, Math.max(1, e.target.value))
                          }
                          className="w-16 rounded border border-gray-300 p-1"
                        />
                        <button
                          onClick={() => saveCart(item.id)}
                          className="ml-2 rounded bg-blue-600 px-4 py-1 text-white transition duration-200 hover:bg-blue-700"
                        >
                          Save
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        Rp{" "}
                        {(item.price * item.quantity).toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded bg-red-600 px-4 py-1 text-white transition duration-200 hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-right font-bold text-gray-800"
                    >
                      Total:
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartIndex;
