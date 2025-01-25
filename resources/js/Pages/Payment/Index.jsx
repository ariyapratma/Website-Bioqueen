import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";

const Index = ({ order, orderInformation, auth }) => {
  const [snapToken, setSnapToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mendapatkan Snap Token secara otomatis
  useEffect(() => {
    const fetchSnapToken = async () => {
      if (!order || !order.id) return;

      setIsLoading(true);

      try {
        const response = await fetch(`/payment/${order.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
          body: JSON.stringify({
            total_price: order.total_price,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          throw new Error("Failed to fetch SnapToken");
        }

        const data = await response.json();
        console.log("SnapToken received:", data.snap_token);
        setSnapToken(data.snap_token);
      } catch (error) {
        console.error("Error fetching SnapToken:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnapToken();
  }, [order]);

  // Fungsi untuk memproses pembayaran
  const handlePayment = () => {
    if (!snapToken) {
      alert("SnapToken belum tersedia. Silakan coba lagi.");
      return;
    }

    window.snap.pay(snapToken, {
      onSuccess: (result) => console.log("Payment success", result),
      onPending: (result) => console.log("Payment pending", result),
      onError: (result) => console.error("Payment error", result),
    });
  };

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
                <td className="p-2 font-medium text-gray-600">Total Price:</td>
                <td className="p-2 text-gray-800">
                  Rp {formatPrice(parseFloat(order.total_price))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pay Now Button */}
        <div className="mt-4">
          <button
            id="pay-button"
            onClick={handlePayment}
            className={`w-full rounded-lg px-6 py-3 font-semibold text-black ${
              isLoading
                ? "cursor-not-allowed bg-green-600"
                : "bg-custom-yellow hover:bg-yellow-600"
            }`}
            disabled={isLoading || !snapToken}
          >
            {isLoading
              ? "Processing..."
              : !snapToken
                ? "SnapToken belum tersedia"
                : "Pay Now"}
          </button>
        </div>
      </div>

      {/* Script Snap.js */}
      <script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={import.meta.env.VITE_MIDTRANS_CLIENT_KEY}
      ></script>
    </div>
  );
};

export default Index;
