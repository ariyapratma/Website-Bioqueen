import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";

const Index = ({ order, orderItems, orderInformation, totalPrice, auth }) => {
  const [paymentLink, setPaymentLink] = useState("");
  const [calculatedTotalPrice, setCalculatedTotalPrice] = useState(
    totalPrice || 0,
  );

  useEffect(() => {
    if (orderItems && orderItems.length > 0) {
      const total = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      setCalculatedTotalPrice(total);
    } else {
      setCalculatedTotalPrice(0);
    }
  }, [orderItems]);

  const formatPrice = (price) => {
    const validPrice = price && !isNaN(price) ? price : 0;
    return validPrice.toLocaleString("id-ID");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <Head title="Payment | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
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
                <td className="p-2 text-gray-800">
                  {orderInformation.recipient_name}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 font-medium text-gray-600">Email:</td>
                <td className="p-2 text-gray-800">{orderInformation.email}</td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-600">Address:</td>
                <td className="p-2 text-gray-800">
                  {orderInformation.address}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-600">Postal Code:</td>
                <td className="p-2 text-gray-800">
                  {orderInformation.postal_code}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 font-medium text-gray-600">Notes:</td>
                <td className="p-2 text-gray-800">
                  {orderInformation.notes || "No notes provided"}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium text-gray-600">Total Amount:</td>
                <td className="p-2 text-gray-800">
                  Rp {formatPrice(parseFloat(order.total_price))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pay Now Button */}
        {paymentLink && (
          <div className="mt-4">
            <button
              onClick={() => (window.location.href = paymentLink)}
              className="w-full rounded bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600"
            >
              Pay Now
            </button>
          </div>
        )}

        {/* Alternatively, if you want the button visible always */}
        {!paymentLink && (
          <div className="mt-4">
            <button
              onClick={() => alert("Payment process coming soon!")}
              className="w-full rounded-lg bg-custom-yellow py-3 font-semibold text-black transition hover:bg-yellow-600"
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
