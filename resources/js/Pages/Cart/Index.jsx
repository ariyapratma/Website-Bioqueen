import Navbar from "@/Components/Navbar/Navbar";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";

const Index = ({ auth, cartItems }) => {
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
    if (quantity <= 0) {
      Swa;
      l.fire({
        title: "Error!",
        text: "Quantity must be greater than 0.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const newUpdatedItems = updatedItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity: quantity,
            price: item.product?.price * quantity,
          }
        : item,
    );

    setUpdatedItems(newUpdatedItems);
    const itemToUpdate = newUpdatedItems.find((item) => item.id === itemId);

    if (itemToUpdate) {
      Inertia.put(`/carts/update/${itemId}`, {
        quantity: itemToUpdate.quantity,
      })
        .then((response) => {
          Swal.fire({
            title: "Updated!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK",
            scrollbarPadding: false,
            backdrop: false,
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
            scrollbarPadding: false,
            backdrop: false,
          });
        });
    }
  };

  useEffect(() => {
    if (flash?.success) {
      Swa;
      l.fire({
        icon: "success",
        title: "Success!",
        text: flash.success,
        timer: 2000,
        showConfirmButton: false,
        scrollbarPadding: false,
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
        scrollbarPadding: false,
        backdrop: false,
      });
    }
  }, [cartItems, flash]);

  const handleTabClick = (menuIndex) => {
    if (menuIndex <= completedStep) {
      setActiveMenu(menuIndex);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Please complete the previous step first!",
        scrollbarPadding: false,
        backdrop: false,
      });
    }
  };

  const handleContinue = () => {
    const totalPrice = updatedItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * (item.quantity || 0);
    }, 0);

    const orderData = updatedItems.map((item) => ({
      product_id: item.product?.id,
      quantity: item.quantity,
      price: item.product?.price,
    }));

    if (!orderData.every((item) => item.product_id && item.quantity >= 1)) {
      Swal.fire({
        title: "Error!",
        text: "All products must have a valid product ID and quantity.",
        icon: "error",
        confirmButtonText: "OK",
        scrollbarPadding: false,
        backdrop: false,
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
              scrollbarPadding: false,
              backdrop: false,
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
            scrollbarPadding: false,
            backdrop: false,
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
      scrollbarPadding: false,
      backdrop: false,
    }).then((result) => {
      if (result.isConfirmed) {
        destroy(`/carts/remove/${itemId}`, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "The item has been removed successfully.",
              icon: "success",
              confirmButtonText: "OK",
              scrollbarPadding: false,
              backdrop: false,
            });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "Failed to remove the item.",
              icon: "error",
              confirmButtonText: "OK",
              scrollbarPadding: false,
              backdrop: false,
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
      <main className="flex-grow px-4 py-16 md:px-4 md:py-32">
        <div className="container mx-auto mb-16 px-4">
          <h1 className="mb-8 text-center font-lexend text-2xl font-bold text-gray-800 sm:text-4xl">
            Your Cart
          </h1>

          {/* Menu Navigasi Tahapan */}
          <div className="mb-4 py-4">
            <div className="container mx-auto flex flex-wrap justify-center space-x-4 space-y-4 lg:space-y-0">
              <button
                onClick={() => handleTabClick(1)}
                className={`${
                  activeMenu === 1
                    ? "bg-custom-yellow text-black"
                    : "border border-custom-yellow bg-white text-black opacity-50"
                } text-md md:w-50 w-44 rounded-full px-6 py-2 font-bold transition duration-300 sm:w-48`}
              >
                1. Cart
              </button>

              <button
                onClick={() => handleTabClick(2)}
                className={`${
                  activeMenu === 2
                    ? "bg-custom-yellow text-black"
                    : "cursor-not-allowed border border-custom-yellow bg-gray-300 text-gray-500"
                } text-md md:w-50 w-44 rounded-full px-6 py-2 font-bold transition duration-300 sm:w-48`}
              >
                2. Order Info
              </button>

              <button
                onClick={() => handleTabClick(3)}
                className={`${
                  activeMenu === 3
                    ? "bg-custom-yellow text-black"
                    : "cursor-not-allowed border border-custom-yellow bg-gray-300 text-gray-500"
                } text-md md:w-50 w-44 rounded-full px-6 py-2 font-bold transition duration-300 sm:w-48`}
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
            <div className="overflow-x-auto rounded-lg bg-white font-lexend shadow-lg">
              <table className="min-w-full border-collapse">
                <thead className="bg-custom-yellow text-left text-sm font-medium text-black">
                  <tr>
                    <th className="px-6 py-3 text-center">Product</th>
                    <th className="px-6 py-3 text-center">Price</th>
                    <th className="px-6 py-3 text-center">Quantity</th>
                    <th className="px-6 py-3 text-center">Total</th>
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
                        <span className="ml-4 text-center text-sm font-medium text-gray-800">
                          {item.product?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-800">
                        Rp{" "}
                        {parseFloat(item.product?.price).toLocaleString(
                          "id-ID",
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        <div className="flex items-center justify-center space-x-4">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="rounded-lg bg-gray-200 px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-300 focus:outline-none"
                          >
                            -
                          </button>

                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Math.max(1, e.target.value),
                              )
                            }
                            className="w-16 rounded-md border p-2 text-center text-lg font-medium text-gray-800 focus:ring-2 focus:ring-custom-yellow"
                          />

                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="rounded-lg bg-gray-200 px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-300 focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-800">
                        Rp{" "}
                        {parseFloat(
                          item.product?.price * item.quantity,
                        ).toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="font-semibold text-red-500"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 flex justify-between px-6 py-4 text-sm font-semibold text-black">
                <div>
                  <p className="font-semibold text-gray-800">
                    Total Price: Rp {totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <button
                    onClick={handleContinue}
                    className="rounded-lg bg-custom-yellow px-6 py-3 font-semibold text-black transition hover:bg-yellow-600"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
