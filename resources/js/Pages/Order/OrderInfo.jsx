import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";

const OrderInfo = ({ auth }) => {
  const user = auth.user;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [recipientName, setRecipientName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post("/order/submit", {
      paymentMethod,
      notes,
      recipientName,
      email,
      address,
      postalCode,
      deliveryNotes,
      deliveryMethod,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6 bg-neutral-50">
        <Head title="Order Info | PT Ratu Bio Indonesia" />

        <div className="container mx-auto px-4 py-10 font-lexend">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Informasi Pemesanan
            </h1>

            {/* Set Delivery Location */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Set Delivery Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Set the exact location on map
                  </label>
                  <div className="mt-1 bg-gray-200 h-56 rounded-md">
                    {/* Placeholder Map */}
                    <p className="text-center py-24">[Map Here]</p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Complete Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full address"
                  />
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700 mt-4"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter postal code"
                  />
                  <label
                    htmlFor="deliveryNotes"
                    className="block text-sm font-medium text-gray-700 mt-4"
                  >
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    id="deliveryNotes"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Additional delivery instructions"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* Recipient Details */}
            <h2 className="text-lg font-semibold mb-4">Recipient Detail</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recipient Name */}
                <div>
                  <label
                    htmlFor="recipientName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label
                  htmlFor="paymentMethod"
                  className="block text-sm font-medium text-gray-700"
                >
                  Metode Pembayaran
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Pilih metode pembayaran</option>
                  <option value="Credit Card">Kartu Kredit</option>
                  <option value="Bank Transfer">Transfer Bank</option>
                  <option value="Cash on Delivery">Bayar di Tempat</option>
                </select>
              </div>

              {/* Delivery Method */}
              <div>
                <label
                  htmlFor="deliveryMethod"
                  className="block text-sm font-medium text-gray-700"
                >
                  Metode Pengiriman
                </label>
                <select
                  id="deliveryMethod"
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Pilih metode pengiriman</option>
                  <option value="Delivery Now">Pengiriman Sekarang</option>
                  <option value="Scheduled Delivery">Pengiriman Terjadwal</option>
                  <option value="Delivery Courier">Kurir Pengiriman</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Catatan (Opsional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-custom-yellow rounded-md py-2 px-4 text-black font-semibold hover:bg-green-700 transition duration-200"
                >
                  Kirim Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
