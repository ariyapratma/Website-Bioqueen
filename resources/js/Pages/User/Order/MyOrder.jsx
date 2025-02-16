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
        Inertia.patch(
          "/my-order/cancel",
          {},
          {
            onSuccess: () => {
              Swal.fire(
                "Cancelled!",
                "Your order has been cancelled.",
                "success",
              );
            },
            onError: () => {
              Swal.fire("Error!", "Failed to cancel orders.", "error");
            },
          },
        );
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
      <div className="flex-1 bg-neutral-50 p-6 mt-12">
        <Head title="View My Order | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end">
          {/* Payment Button */}
          <button
            onClick={() => Inertia.visit(`/payment/${orders[0]?.id}`)}
            className="ml-4 inline-flex w-20 items-center justify-center rounded-lg bg-custom-yellow px-4 py-2 text-sm font-semibold text-black transition duration-300 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
          >
            Payment
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleCancelOrders}
            className="ml-4 inline-flex w-20 items-center justify-center rounded-lg border border-gray-300 bg-black px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>

        {/* Order Summary Table */}
        <h2 className="mb-4 font-lexend text-xl font-bold">Order Summary</h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Product ID
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Product Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Product Image
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Product Quantity
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Total Price
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Status
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
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.product?.id || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.product?.name || "N/A"}
                    </td>
                    <td className="flex items-center justify-center whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                      <img
                        src={
                          order.product?.image_url
                            ? `/storage/${order.product.image_url}`
                            : "/default-image.jpg"
                        }
                        alt="Product Image"
                        className="h-24 w-24 rounded-t-lg object-contain"
                        style={{ aspectRatio: "1 / 1" }}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order?.quantity || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      Rp{" "}
                      {parseFloat(order.total_price || 0).toLocaleString(
                        "id-ID",
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-center text-xs font-medium ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Order Details Table */}
        <h2 className="mb-4 mt-8 font-lexend text-xl font-bold">
          Order Details
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="text-centertext-xs px-6 py-3 font-medium tracking-wider text-gray-500">
                  Order Number
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Order Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Recipient Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Notes
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Shipping Method
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No order details available.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.id}
                    </td>
                    <td className="text-centerpx-6 whitespace-nowrap py-4 font-lexend text-sm text-gray-700">
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
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.informations?.recipient_name || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.informations?.notes || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.informations?.payment_method?.name || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.informations?.shipping_method?.name || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-center text-xs font-medium ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status || "N/A"}
                      </span>
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
