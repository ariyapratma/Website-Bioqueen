import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import {
  MdFactCheck,
  MdPerson,
  MdEmail,
  MdReceiptLong,
  MdChat,
  MdAttachMoney,
  MdErrorOutline,
} from "react-icons/md";

const OrderInfo = ({ auth }) => {
  const user = auth.user;
  const [orderItems, setOrderItems] = useState([]);
  const [orderId, setOrderId] = useState(user?.order_id || "");
  const [recipientName, setRecipientName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Mengambil cartItems dari usePage().props
  const { cartItems } = usePage().props;

  // Set orderItems to cartItems when the component mounts
  useEffect(() => {
    if (Array.isArray(cartItems)) {
      setOrderItems(cartItems); // Match the orderItems with cartItems
    } else {
      console.error("cartItems is not an array or is undefined");
    }
  }, [cartItems]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!recipientName || !email || !postalCode || !address) {
      console.log("Incomplete Form Data: ", {
        recipientName,
        email,
        notes,
        address,
        postalCode,
      });
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill out all required fields.",
        confirmButtonText: "OK",
      });
      return;
    }

    // Ensure orderItems is defined
    if (!orderItems || orderItems.length === 0) {
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
      // Send order details to the order-details endpoint
      const detailsResponse = await fetch("/order-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({
          orderItems,
          orderId,
          recipientName,
          email,
          postalCode,
          address,
          notes,
        }),
        credentials: "same-origin",
      });

      const detailsResult = await detailsResponse.json();

      if (detailsResponse.ok) {
        Swal.fire({
          icon: "success",
          title: "Order Submitted",
          text:
            detailsResult.message ||
            "Order and order details saved successfully!",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error(
          detailsResult.message || "Failed to submit order details.",
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

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex-1 bg-neutral-50 p-6">
        <div className="container mx-auto font-lexend">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-3xl font-bold text-gray-800">
                  Order Information
                </h1>

                <form onSubmit={handleSubmit}>
                  {/* Recipient Name */}
                  <div className="mb-4">
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
                            <th className="px-6 py-3 text-left font-lexend font-medium tracking-wider text-black">
                              Product
                            </th>
                            <th className="px-6 py-3 text-left font-lexend font-medium tracking-wider text-black">
                              Price
                            </th>
                            <th className="px-6 py-3 text-left font-lexend font-medium tracking-wider text-black">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-left font-lexend font-medium tracking-wider text-black">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems.map((item, index) => (
                            <tr key={index}>
                              <td className="whitespace-nowrap border px-6 py-4 font-lexend text-sm text-gray-700">
                                {item.product.name}
                              </td>
                              <td className="whitespace-nowrap border px-6 py-4 font-lexend text-sm text-gray-700">
                                Rp{" "}
                                {parseFloat(item.product.price).toLocaleString(
                                  "id-ID",
                                )}
                              </td>
                              <td className="whitespace-nowrap border px-6 py-4 font-lexend text-sm text-gray-700">
                                {item.quantity}
                              </td>
                              <td className="whitespace-nowrap border px-6 py-4 font-lexend text-sm text-gray-700">
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
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-black">
                  Order Summary
                </h2>
                <ul className="space-y-4">
                  {/* Menampilkan Order ID */}
                  <li className="flex items-center">
                    <MdFactCheck className="h-6 w-6 text-custom-yellow" />
                    <span className="ml-2 text-sm text-gray-700">
                      Order ID: <strong>{orderId}</strong>
                    </span>
                  </li>

                  {/* Menampilkan Recipient Name */}
                  <li className="flex items-center">
                    <MdPerson className="h-6 w-6 text-custom-yellow" />
                    <span className="ml-2 text-sm text-gray-700">
                      Recipient Name: <strong>{recipientName}</strong>
                    </span>
                  </li>

                  {/* Menampilkan Email */}
                  <li className="flex items-center">
                    <MdEmail className="h-6 w-6 text-custom-yellow" />
                    <span className="ml-2 text-sm text-gray-700">
                      Email: <strong>{email}</strong>
                    </span>
                  </li>

                  {/* Menampilkan Order Date */}
                  <li className="flex items-center">
                    <MdReceiptLong className="h-6 w-6 text-custom-yellow" />
                    <span className="ml-2 text-sm text-gray-700">
                      Order Date:{" "}
                      <strong>{new Date().toLocaleDateString()}</strong>
                    </span>
                  </li>

                  {/* Menampilkan Notes */}
                  <li className="flex items-center">
                    <MdChat className="h-6 w-6 text-custom-yellow" />
                    <span className="ml-2 text-sm text-gray-700">
                      Notes: <strong>{notes || "No notes provided"}</strong>
                    </span>
                  </li>

                  {/* Menampilkan Total */}
                  <li className="flex items-center">
                    <MdAttachMoney className="h-6 w-6 text-custom-yellow" />
                    <span className="ml-2 text-sm text-gray-700">
                      Total:{" "}
                      <strong>
                        Rp{" "}
                        {orderItems
                          .reduce(
                            (total, item) =>
                              total + item.product.price * item.quantity,
                            0,
                          )
                          .toLocaleString("id-ID")}
                      </strong>
                    </span>
                  </li>

                  {/* Menampilkan Shipping Address */}
                  <li className="flex items-center">
                    <MdErrorOutline className="h-6 w-6 text-custom-yellow" />
                    <span className="ml-2 text-sm text-gray-700">
                      Shipping Address: <strong>{address}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
