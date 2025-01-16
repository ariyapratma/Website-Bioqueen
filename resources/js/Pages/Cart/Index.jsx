import Navbar from "@/Components/Navbar/Navbar";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";

const CartIndex = ({ auth, cartItems }) => {
  const { user } = auth;
  const [activeMenu, setActiveMenu] = useState(1);
  const [completedStep, setCompletedStep] = useState(1);
  const { flash } = usePage().props;
  const [updatedItems, setUpdatedItems] = useState(cartItems);
  const { delete: destroy } = useForm();
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
          onSuccess: (response) => {
            Swal.fire({
              title: "Updated!",
              text:
                response.message || "Quantity and price updated successfully.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              Inertia.visit("/carts");
            });
          },
        },
      );
    }
  };

  useEffect(() => {
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

  const handleTabClick = (menuIndex) => {
    if (menuIndex <= completedStep) {
      setActiveMenu(menuIndex);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Akses Ditolak",
        text: "Harap selesaikan langkah sebelumnya terlebih dahulu!",
      });
    }
  };

  const handleContinue = () => {
    // Debugging log
    console.log("Updated Items:", updatedItems);

    const totalPrice = updatedItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * (item.quantity || 0);
    }, 0);

    const orderData = updatedItems.map((item) => ({
      product_id: item.product?.id,
      quantity: item.quantity,
      price: item.product?.price,
    }));

    // Debugging log
    console.log("Order Data:", orderData);

    if (!orderData.every((item) => item.product_id && item.quantity >= 1)) {
      Swal.fire({
        title: "Error!",
        text: "All products must have a valid product ID and quantity.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    Inertia.post(
      "/order",
      {
        orderItems: orderData,
        total_price: totalPrice,
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
    setCompletedStep((prev) => Math.max(prev, activeMenu + 1));
    setActiveMenu((prev) => prev + 1);
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
        destroy(`/carts/remove/${itemId}`, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "The item has been removed successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "Failed to remove the item.",
              icon: "error",
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

          {/* Menu Navigasi Tahapan */}
          <div className="mb-4 py-4">
            <div className="container mx-auto flex justify-center space-x-8">
              {/* Button untuk Cart */}
              <button
                onClick={() => handleTabClick(1)}
                className={`${
                  activeMenu === 1
                    ? "bg-custom-yellow text-black"
                    : "border border-custom-yellow bg-white text-black opacity-50"
                } text-md rounded-full px-6 py-2 font-bold transition duration-300`}
                disabled={completedStep < 1}
              >
                1. Cart
              </button>

              {/* Button untuk Order Info */}
              <button
                onClick={() => handleTabClick(2)}
                className={`${
                  activeMenu === 2
                    ? "bg-custom-yellow text-black"
                    : "cursor-not-allowed border border-custom-yellow bg-gray-300 text-gray-500"
                } text-md rounded-full px-6 py-2 font-bold transition duration-300`}
                disabled={completedStep < 2}
              >
                2. Order Info
              </button>

              {/* Button untuk Payment */}
              <button
                onClick={() => handleTabClick(3)}
                className={`${
                  activeMenu === 3
                    ? "bg-custom-yellow text-black"
                    : "cursor-not-allowed border border-custom-yellow bg-gray-300 text-gray-500"
                } text-md rounded-full px-6 py-2 font-bold transition duration-300`}
                disabled={completedStep < 3}
              >
                3. Payment
              </button>
            </div>
          </div>

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
                          className="w-16 rounded border border-gray-300 p-2"
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
                        {(
                          parseFloat(item.product?.price) * item.quantity
                        ).toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t px-6 py-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-800">
                    Total:
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 text-center">
                <button
                  onClick={handleContinue}
                  className="mt-6 w-full rounded-lg bg-custom-yellow py-3 text-lg font-semibold text-black"
                >
                  Continue to Checkout
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
