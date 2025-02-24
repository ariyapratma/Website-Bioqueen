import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

const OrderInformation = ({ auth }) => {
  const user = auth.user;
  const [orderItems, setOrderItems] = useState([]);
  const [recipientName, setRecipientName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const { cartItems } = usePage().props;

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      setOrderItems(cartItems);
    } else {
    }
  }, [cartItems]);

  useEffect(() => {
    fetch("/api/methods")
      .then((response) => response.json())
      .then((data) => {
        setPaymentMethods(data.payment_methods);
        setShippingMethods(data.shipping_methods);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

      if (!csrfToken) {
        Swal.fire({
          icon: "error",
          title: "CSRF Token Missing",
          text: "Please refresh the page and try again.",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        });
        return;
      }

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
          postal_code: parseInt(postalCode, 10),
          payment_method_id: paymentMethod,
          shipping_method_id: shippingMethod,
        }),
        credentials: "same-origin",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to submit order information.",
        );
      }

      const result = await response.json();
      Swal.fire({
        icon: "success",
        title: "Order Submitted",
        text: result.message || "Order submitted successfully!",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
        scrollbarPadding: false,
        backdrop: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "An error occurred while submitting the order.",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
        scrollbarPadding: false,
        backdrop: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Order Information
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-lg"
      >
        {/* Recipient Name */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Recipient Name
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
            required
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
            rows="4"
            placeholder="Add any additional instructions..."
          />
        </div>

        {/* Payment Method Dropdown */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
            required
          >
            <option value="">Select Payment Method</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        {/* Shipping Method Dropdown */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Shipping Method
          </label>
          <select
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
            required
          >
            <option value="">Select Shipping Method</option>
            {shippingMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
            required
          />
        </div>

        {/* Postal Code */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            type="number"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-black px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-gray-800"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderInformation;
