import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

const MyOrder = ({ orders = [], auth }) => {
  const [activeMenu, setActiveMenu] = useState("my-order");
  const user = auth?.user;

  const handleCancelOrders = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel all orders!",
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.patch("/my-order/cancel", {}, {
          onSuccess: () => {
            Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Failed to cancel orders.", "error");
          }
        });
      }
    });
  };
    
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {auth && (
        <Sidebar
          auth={auth}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="View My Order | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />

        {/* Order Status */}
        <div className="mb-6 mt-16 text-center">
          {/* Title */}
          <h2 className="font-lexend text-2xl font-bold">Order Status</h2>

          {orders.length === 0 ? (
            <p className="mt-2 text-center font-lexend text-sm font-medium text-red-500">
              No order status available.
            </p>
          ) : (
            <span
              className={`mt-2 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${
                orders[0]?.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : orders[0]?.status === "Processing"
                    ? "bg-blue-100 text-blue-800"
                    : orders[0]?.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : orders[0]?.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
              }`}
            >
              {orders[0]?.status}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="mb-2 font-lexend text-xl font-bold">Order Summary</h2>

        {/* Button Payment And Cancel */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => Inertia.visit(`/payment/${orders.id}`)}
            className="ml-4 inline-flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-semibold text-white shadow-sm transition duration-300 hover:bg-gray-900"
          >
            Payment
          </button>
          <button
            onClick={handleCancelOrders}
            className="ml-4 inline-flex items-center justify-center rounded-md border border-red-600 bg-white px-6 py-3 text-base font-semibold text-red-600 shadow-sm transition duration-300 hover:bg-red-50"
          >
            Cancel
          </button>
        </div>

        {/* Order Summary */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                  Product Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                  Product Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                  Total Price
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No order summary available.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                      {order.product_id || "Product id not available."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                      {order.product?.name || "Product name not available."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                      <img
                        src={
                          order.product?.image_url || "No image available."
                            ? `/storage/${order.product?.image_url}`
                            : "/default-image.jpg"
                        }
                        className="h-24 w-24 rounded-t-lg object-contain"
                        style={{ aspectRatio: "1 / 1" }}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                      Rp{" "}
                      {parseFloat(
                        order.total_price || "No total price available.",
                      ).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Title */}
        <h2 className="mb-6 mt-6 font-lexend text-xl font-bold">
          Order Details
        </h2>

        {/* Order Details */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left font-lexend text-xs font-medium tracking-wider text-gray-500">
                  Order Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                  Recipient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                  Notes
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No order details available.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "Date not available."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                      {order.informations?.recipient_name ||
                        "No recipient name available."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                      {order.informations?.notes || "No notes available."}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
