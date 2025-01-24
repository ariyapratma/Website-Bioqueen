import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

const OrderInfo = ({ auth }) => {
  const user = auth.user;
  const [activeMenu, setActiveMenu] = useState(2);
  const [orderItems, setOrderItems] = useState([]);
  const [recipientName, setRecipientName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { cartItems } = usePage().props;

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      setOrderItems(cartItems);
    } else {
      console.error("cartItems is not an array or is undefined");
    }
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!recipientName || !email || !postalCode || !address) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill out all required fields.",
        confirmButtonText: "OK",
      });
      return;
    }

    // Ensure orderItems is defined
    if (!cartItems || cartItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No items in cart",
        text: "Please add items to your cart before submitting.",
        confirmButtonText: "OK",
      });
      return;
    }

    // CSRF token retrieval
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");

    if (!csrfToken) {
      Swal.fire({
        icon: "error",
        title: "CSRF Token Missing",
        text: "Please refresh the page and try again.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await fetch("/order-informations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({
          recipient_name: recipientName,
          email: email,
          notes: notes,
          address: address,
          postal_code: postalCode,
        }),
        credentials: "same-origin",
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Order Submitted",
          text: result.message || "Order submitted successfully!",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error(
          result.message || "Failed to submit order informations.",
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "An error occurred while submitting the order.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleTabClick = (menuIndex) => {
    if (menuIndex === 1) {
      // Navigasi ke halaman cart jika menu pertama diklik
      Inertia.visit("/carts");
    } else {
      // Jika tidak, set menu aktif sesuai menu yang diklik
      setActiveMenu(menuIndex);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex-1 bg-neutral-50 p-6">
        <div className="container mx-auto font-lexend">
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h1 className="mb-6 text-3xl font-bold text-gray-800">
                Order Information
              </h1>

              {/* Menu Navigasi Tahapan */}
              <div className="mb-4 py-4">
                <div className="container mx-auto flex flex-wrap justify-center space-x-8 space-y-4 lg:space-y-0">
                  {/* Button untuk Cart */}
                  <button
                    onClick={() => handleTabClick(1)}
                    className={`${
                      activeMenu === 1
                        ? "bg-custom-yellow text-black"
                        : "border border-custom-yellow bg-white text-black opacity-50"
                    } text-md w-50 rounded-full px-6 py-2 font-bold transition duration-300`}
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
                    } text-md w-50 rounded-full px-6 py-2 font-bold transition duration-300`}
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
                    } text-md w-50 rounded-full px-6 py-2 font-bold transition duration-300`}
                  >
                    3. Payment
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Recipient Name */}
                <div className="mb-4">
                  {/* Order Items */}
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500">No items in the order</p>
                  ) : (
                    <div className="mb-4 overflow-x-auto">
                      <h2 className="mb-2 text-lg font-semibold">
                        Order Items
                      </h2>
                      <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
                        <thead>
                          <tr className="border bg-custom-yellow">
                            <th className="px-6 py-3 text-left font-lexend font-semibold tracking-wider text-black">
                              Product
                            </th>
                            <th className="px-6 py-3 text-left font-lexend font-semibold tracking-wider text-black">
                              Price
                            </th>
                            <th className="px-6 py-3 text-left font-lexend font-semibold tracking-wider text-black">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-left font-lexend font-semibold tracking-wider text-black">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems.map((item, index) => (
                            <tr key={index}>
                              <td className="whitespace-nowrap border px-6 py-4 font-lexend text-sm font-semibold text-black">
                                {item.product.name}
                              </td>
                              <td className="whitespace-nowrap border px-6 py-4 text-sm font-semibold text-black">
                                Rp{" "}
                                {parseFloat(item.product.price).toLocaleString(
                                  "id-ID",
                                )}
                              </td>
                              <td className="whitespace-nowrap border px-6 py-4 text-sm font-semibold text-black">
                                {item.quantity}
                              </td>
                              <td className="whitespace-nowrap border px-6 py-4 text-sm font-semibold text-black">
                                Rp{" "}
                                {parseFloat(
                                  item.product.price * item.quantity,
                                ).toLocaleString("id-ID")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <label className="block text-sm font-medium text-gray-700">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full rounded border border-gray-300 p-2"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-gray-300 p-2"
                    required
                  />
                </div>

                {/* Notes */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded border border-gray-300 p-2"
                    rows="4"
                    placeholder="Add any additional instructions..."
                  />
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded border border-gray-300 p-2"
                    required
                  />
                </div>

                {/* Postal Code */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="number"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full rounded border border-gray-300 p-2"
                    required
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-custom-yellow px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-custom-yellow focus:ring-offset-2"
                  >
                    Submit Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
