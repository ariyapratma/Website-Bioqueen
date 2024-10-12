import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";

const OrderInfo = ({ auth }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [recipientName, setRecipientName] = useState(auth?.user?.name || ""); // Default to logged-in user's name
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post("/order/submit", {
      paymentMethod,
      notes,
      recipientName,
      address,
      deliveryMethod,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Head title="Order Info | PT Ratu Bio Indonesia" />
      <main className="flex-grow py-32">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-center font-lexend text-4xl font-bold text-gray-800">
            Order Information
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="recipientName"
                className="block text-sm font-medium text-gray-700"
              >
                Recipient Name
              </label>
              <input
                type="text"
                id="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Full Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select payment method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="deliveryMethod"
                className="block text-sm font-medium text-gray-700"
              >
                Delivery Method
              </label>
              <select
                id="deliveryMethod"
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select delivery method</option>
                <option value="Standard Delivery">Standard Delivery</option>
                <option value="Express Delivery">Express Delivery</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="rounded bg-green-600 px-6 py-2 text-white transition duration-200 hover:bg-green-700"
              >
                Submit Order
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default OrderInfo;
