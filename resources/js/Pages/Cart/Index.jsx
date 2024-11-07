import Navbar from "@/Components/Navbar/Navbar";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";

const CartIndex = ({ cartItems, auth }) => {
  const { flash } = usePage().props;
  const [updatedItems, setUpdatedItems] = useState(cartItems);

  // Ambil method delete dari useForm di sini
  const { delete: destroy } = useForm();

  // Hitung total harga berdasarkan kuantitas dan harga produk
  const totalPrice = updatedItems.reduce(
    (sum, item) => sum + item.product?.price * item.quantity,
    0,
  );

  const updateQuantity = (itemId, quantity) => {
    const updated = updatedItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity,
            price: item.product?.price * quantity,
          }
        : item,
    );
    setUpdatedItems(updated);
  };

  const saveCart = (itemId) => {
    const itemToSave = updatedItems.find((item) => item.id === itemId);

    if (itemToSave) {
      Inertia.put(
        `/carts/update/${itemId}`,
        { quantity: itemToSave.quantity },
        {
          // Hapus onSuccess dan onError di sini
          onSuccess: (response) => {
            // Tampilkan SweetAlert tanpa mengembalikan respons ke Inertia
            Swal.fire({
              title: "Updated!",
              text:
                response.message || "Quantity and price updated successfully.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              // Mengunjungi ulang halaman untuk mendapatkan data terbaru
              Inertia.visit("/carts");
            });
          },
        },
      );
    }
  };

  useEffect(() => {
    // Jika ada flash message sukses, tampilkan SweetAlert
    if (flash?.success) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: flash.success,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [flash]);

  useEffect(() => {
    setUpdatedItems(cartItems);

    // Display SweetAlert for flash message
    if (flash?.success) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: flash.success,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [cartItems, flash]);

  const handleContinue = () => {
    console.log("Updated Items:", updatedItems); // Debugging log

    const orderData = updatedItems.map((item) => ({
      product_id: item.product?.id,
      product_name: item.product?.name,
      product_price: item.product?.price,
      quantity: item.quantity,
    }));

    console.log("Order Data:", orderData); // Debugging log

    if (!orderData.every((item) => item.product_id)) {
      console.error("Missing product_id in orderData:", orderData);
      Swal.fire({
        title: "Error!",
        text: "Some products are missing a product ID.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    Inertia.post(
      "/order",
      {
        orderItems: orderData,
      },
      {
        onSuccess: (response) => {
          if (response.props?.flash?.success) {
            Swal.fire({
              title: "Success!",
              text: response.props.flash.success,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              Inertia.visit("/order");
            });
          }
        },
        onError: (errors) => {
          Swal.fire({
            title: "Error!",
            text: "There was an error processing your order.",
            icon: "error",
            confirmButtonText: "OK",
          });
        },
      },
    );
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
        // Gunakan destroy dari useForm untuk melakukan request delete
        destroy(`/carts/remove/${itemId}`, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "The item has been removed successfully.",
              icon: "success", // Menambahkan ikon sukses
              confirmButtonText: "OK",
            });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "Failed to remove the item.",
              icon: "error", // Menambahkan ikon error
              confirmButtonText: "OK",
            });
          },
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Head title="Cart | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow py-32">
        <div className="container mx-auto mb-44 px-4">
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
                        Rp{" "}
                        {parseFloat(item.product?.price).toLocaleString(
                          "id-ID",
                        )}
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
                          className="ml-2 rounded bg-blue-600 px-2 py-2 text-white transition duration-200 hover:bg-blue-700"
                        >
                          Save
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        Rp{" "}
                        {(item.product?.price * item.quantity).toLocaleString(
                          "id-ID",
                        )}
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
                      Rp{" "}
                      {totalPrice.toLocaleString("id-ID")}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="mt-8 flex justify-between gap-4">
                <button
                  onClick={() => Inertia.get("product")}
                  className="w-full rounded bg-black py-2 px-4 text-white transition duration-200 hover:bg-gray-900"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleContinue}
                  className="w-full rounded bg-green-600 py-2 px-4 text-white transition duration-200 hover:bg-green-700"
                >
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
