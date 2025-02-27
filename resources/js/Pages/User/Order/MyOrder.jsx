import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

const MyOrder = ({ orders = [], auth }) => {
  const [activeMenu, setActiveMenu] = useState("my-order");
  const user = auth?.user;

  const handlePaymentClick = async () => {
    try {
      const response = await fetch("/check-order-status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content"),
        },
      });

      if (!response.ok) {
        const errorData = await response.text(); // Baca respons sebagai teks
        console.error("Server returned an error:", errorData);
        throw new Error("Failed to check order status.");
      }

      const data = await response.json();

      if (data.isOrderComplete) {
        const orderId = orders[0]?.id;

        if (!orderId) {
          Swal.fire({
            title: "Error!",
            text: "No valid order found for payment.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#000000",
          });
          return;
        }

        Inertia.visit(`/payment/${orderId}`);
      } else {
        Swal.fire({
          title: "Incomplete Order!",
          text:
            data.message ||
            "Please complete your order and fill in the required information before proceeding to payment.",
          icon: "warning",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
        });
      }
    } catch (error) {
      console.error("Error checking order status:", error);
      Swal.fire({
        title: "Error!",
        text:
          error.message ||
          "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
      });
    }
  };

  const handleCancelOrders = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel orders!",
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
            onError: (errors) => {
              // Handle error jika pembatalan gagal
              Swal.fire(
                "Error!",
                errors?.error || "Failed to cancel orders.",
                "error",
              );
            },
          },
        );
      }
    });
  };

  // Fungsi untuk memberikan warna berdasarkan status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
        return "text-blue-500 font-semibold";
      case "approved":
        return "text-green-500 font-semibold";
      case "completed":
        return "text-green-500 font-semibold";
      case "cancelled":
        return "text-red-500 font-semibold";
    }
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
      <div className="mt-16 flex-1 bg-neutral-50 p-6">
        <Head title="My Order | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">My Order</span>
        </nav>
        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Order Page Content
        </h2>
        {/* Action Buttons */}
        <div className="mb-6 flex gap-2">
          {/* Payment Button */}
          <button
            onClick={handlePaymentClick}
            className="inline-flex w-20 items-center justify-center rounded-lg bg-custom-yellow px-4 py-2 text-sm font-semibold text-black transition duration-300 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
          >
            Payment
          </button>
          {/* Cancel Button */}
          <button
            onClick={handleCancelOrders}
            className="inline-flex w-20 items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
        {/* Order Summary Table for Desktop */}
        <div className="hidden md:block">
          <h3 className="mb-4 font-lexend text-lg font-bold">Order Summary</h3>
          <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Product ID
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Product Name
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Quantity
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total Price
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700"
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
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order?.quantity || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      Rp{" "}
                      {parseFloat(order.total_price || 0).toLocaleString(
                        "id-ID",
                      )}
                    </td>
                    <td
                      className={`whitespace-nowrap px-6 py-4 text-center font-lexend text-sm ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile View */}
        <div className="block md:hidden">
          {orders.length === 0 ? (
            <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
              <p className="text-center font-lexend text-sm text-gray-600">
                No order summary available.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="mb-4 rounded-lg bg-white p-4 shadow-md"
              >
                <div className="flex justify-between">
                  <h3 className="font-lexend text-base font-bold text-gray-800">
                    Product #{order.product?.id || "N/A"}
                  </h3>
                </div>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Product Name: {order.product?.name || "N/A"}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Quantity: {order?.quantity || "N/A"}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Total Price: Rp{" "}
                  {parseFloat(order.total_price || 0).toLocaleString("id-ID")}
                </p>
                <p
                  className={`mt-2 font-lexend text-sm ${getStatusColor(order.status)}`}
                >
                  Status: {order.status || "N/A"}
                </p>
              </div>
            ))
          )}
        </div>
        {/* Order Details Table for Desktop */}
        <div className="hidden md:block">
          <h3 className="mb-4 mt-4 font-lexend text-lg font-bold">
            Order Details
          </h3>
          <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Order Number
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Order Date
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Recipient Name
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Notes
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Shipping Method
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700"
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
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
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
                    <td
                      className={`whitespace-nowrap px-6 py-4 text-center font-lexend text-sm ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile View */}
        <div className="block md:hidden">
          {orders.length === 0 ? (
            <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
              <p className="text-center font-lexend text-sm text-gray-600">
                No order details available.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="mb-4 rounded-lg bg-white p-4 shadow-md"
              >
                <div className="flex justify-between">
                  <h3 className="font-lexend text-base font-bold text-gray-800">
                    Order #{order.id}
                  </h3>
                </div>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Order Date:{" "}
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
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Recipient Name: {order.informations?.recipient_name || "N/A"}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Notes: {order.informations?.notes || "N/A"}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Payment Method:{" "}
                  {order.informations?.payment_method?.name || "N/A"}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Shipping Method:{" "}
                  {order.informations?.shipping_method?.name || "N/A"}
                </p>
                <p
                  className={`mt-2 font-lexend text-sm ${getStatusColor(order.status)}`}
                >
                  Status: {order.status || "N/A"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
