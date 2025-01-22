import React, { useState } from "react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const Payment = ({ order }) => {
  const [paymentLink, setPaymentLink] = useState("");

  const createTransaction = async () => {
    const orderData = {
      order_id: order.id,
      total_amount: order.total_amount,
      recipient_name: order.recipient_name,
      email: order.email,
      address: order.address,
      city: order.city,
      postal_code: order.postal_code,
    };

    try {
      const response = await fetch("/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
            .content,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.token) {
        setPaymentLink(data.token);
        Swal.fire({
          icon: "success",
          title: "Payment Created",
          text: "Please proceed to payment.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: "Failed to create payment.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handlePayment = () => {
    if (paymentLink) {
      window.location.href = paymentLink;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <Head title="Payment | PT Ratu Bio Indonesia" />
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold text-gray-700">
          Payment for Order #{order.id}
        </h1>
        <div className="mb-6">
          <table className="w-full table-auto border-collapse">
            <tbody>
              <tr>
                <td className="p-2 font-medium text-gray-600">
                  Recipient Name:
                </td>
                <td className="p-2 text-gray-800">{order.recipient_name}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 font-medium text-gray-600">Email:</td>
                <td className="p-2 text-gray-800">{order.email}</td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-600">Address:</td>
                <td className="p-2 text-gray-800">{order.address}</td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-600">Postal Code:</td>
                <td className="p-2 text-gray-800">{order.postal_code}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 font-medium text-gray-600">Notes:</td>
                <td className="p-2 text-gray-800">
                  {order.notes || "No notes provided"}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-600">Total Amount:</td>
                <td className="p-2 text-gray-800">Rp {order.total_amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={createTransaction}
          className="w-full rounded bg-custom-yellow px-6 py-3 font-semibold text-black"
        >
          Create Payment
        </button>
        {paymentLink && (
          <div className="mt-4">
            <button
              onClick={handlePayment}
              className="w-full rounded bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600"
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
