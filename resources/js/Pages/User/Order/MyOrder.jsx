import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";
import Swal from "sweetalert2";
import { IoTrash } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { Inertia } from "@inertiajs/inertia";

const MyOrder = ({ orders = [], auth }) => {
  const [activeMenu, setActiveMenu] = useState("my-order");
  const user = auth?.user;

  const handlePayment = async (orderId) => {
    try {
      // Cek status order sebelum melakukan pembayaran
      const response = await fetch(`/check-order-status/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      });

      const data = await response.json();

      if (response.ok && data.status === "Approved") {
        // Dapatkan snap_token dari backend
        const paymentResponse = await fetch(`/payment/${orderId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
        });

        const paymentData = await paymentResponse.json();

        if (paymentResponse.ok && paymentData.snap_token) {
          // Gunakan Midtrans Snap.js untuk membuka pop-up pembayaran
          window.snap.pay(paymentData.snap_token, {
            onSuccess: function (result) {
              console.log("Payment success:", result);
              Swal.fire({
                title: "Payment Successful!",
                text: "Your payment was completed successfully.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#000000",
              });
            },
            onPending: function (result) {
              console.log("Payment pending:", result);
              Swal.fire({
                title: "Payment Pending",
                text: "Your payment is pending. Please complete it later.",
                icon: "info",
                confirmButtonText: "OK",
                confirmButtonColor: "#000000",
              });
            },
            onError: function (error) {
              console.error("Payment error:", error);
              Swal.fire({
                title: "Payment Failed",
                text: "There was an error processing your payment.",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#000000",
              });
            },
            onClose: function () {
              console.log("Payment popup closed by user");
              Swal.fire({
                title: "Payment Canceled",
                text: "You closed the payment window before completing the transaction.",
                icon: "warning",
                confirmButtonText: "OK",
                confirmButtonColor: "#000000",
              });
            },
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to generate payment link.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#000000",
          });
        }
      } else {
        Swal.fire({
          title: "Order Not Ready",
          text: "Your order has not yet been approved for payment. Please complete the required information in the order details to proceed.",
          icon: "warning",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
        });
      }
    } catch (error) {
      console.error("Error checking order status:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
      });
    }
  };

  const handleCancelOrders = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
        confirmButtonColor: "#000000",
        scrollbarPadding: false,
        backdrop: false,
      });

      if (result.isConfirmed) {
        const response = await fetch(`/order/${orderId}/cancel`, {
          method: "POST", // Ubah dari PATCH ke POST
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
        });

        // Cek jika respons bukan JSON (untuk menangani redirect/error)
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format");
        }

        const data = await response.json();

        if (response.ok) {
          Swal.fire({
            title: "Cancelled!",
            text: "Order has been successfully cancelled.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#000000",
          }).then(() => {
            location.reload();
          });
        } else {
          throw new Error(data.message || "Failed to cancel the order.");
        }
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
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

  // Fungsi untuk memberikan warna berdasarkan status
  const getStatusColor = (status) => {
    const statusMapping = {
      processing: "text-blue-500 font-semibold",
      approved: "text-green-500 font-semibold",
      completed: "text-green-500 font-semibold",
      cancelled: "text-red-500 font-semibold",
      pending: "text-yellow-500 font-semibold",
      failed: "text-gray-500 font-semibold",
    };
    return statusMapping[status?.toLowerCase()];
  };

  const getStatusLabel = (status) => {
    const statusLabels = {
      processing: "Processing",
      approved: "Approved",
      completed: "Completed",
      cancelled: "Cancelled",
      pending: "Pending",
      failed: "Failed",
    };
    return statusLabels[status?.toLowerCase()];
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
        {/* Order Summary Table for Desktop */}
        <div className="hidden md:block">
          <h3 className="mb-4 font-lexend text-lg font-bold">Order Summary</h3>
          <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Product ID
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Product Name
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Quantity
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total Price
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
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
                    <td className="max-w-[150px] whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.product?.id || "No Product ID available."}
                    </td>
                    <td className="max-w-[150px] whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.product?.name || "No Product Name available."}
                    </td>
                    <td className="max-w-[150px] whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order?.quantity || "No Quantity available."}
                    </td>
                    <td className="max-w-[150px] whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      Rp{" "}
                      {parseFloat(order.total_price || 0).toLocaleString(
                        "id-ID",
                      )}
                    </td>
                    <td
                      className={`max-w-[150px] whitespace-nowrap px-6 py-4 text-center font-lexend text-sm ${getStatusColor(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
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
                    Product #{order.product?.id || "No Product ID available"} 
                  </h3>
                  <div className="flex items-center space-x-2">
                    {/* Payment Button */}
                    <button
                      onClick={() => handlePayment(order.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <MdOutlinePayment size={20} />
                    </button>
                    {/* Cancel Button */}
                    <button
                      onClick={() => handleCancelOrders(order.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <IoTrash size={20} />
                    </button>
                  </div>
                </div>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Product Name: {order.product?.name || "No Product Name available."}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Quantity: {order?.quantity || "No Quantity available."}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Total Price: Rp{" "}
                  {parseFloat(order.total_price || 0).toLocaleString("id-ID")}
                </p>
                <p
                  className={`mt-2 font-lexend text-sm text-gray-600 ${getStatusColor(order.status)}`}
                >
                  Status: {getStatusLabel(order.status)}
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
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Order Number
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Order Date
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Recipient Name
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Notes
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Payment Method
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Shipping Method
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Action
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
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
                      {order.informations?.recipient_name || "No Recipient Name available."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.informations?.notes || "No Notes available."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.informations?.payment_method?.name || "No Payment Method available."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.informations?.shipping_method?.name || "No Shipping Method available."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {/* Action Buttons */}
                      {/* Payment Button */}
                      <button
                        onClick={() => handlePayment(order.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <MdOutlinePayment size={20} />
                      </button>
                      {/* Cancel Button */}
                      <button
                        onClick={() => handleCancelOrders(order.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <IoTrash size={20} />
                      </button>
                    </td>
                    <td
                      className={`whitespace-nowrap px-6 py-4 text-center font-lexend text-sm ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status || "No Status available."}
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
                  Recipient Name: {order.informations?.recipient_name || "No Recipient Name available."}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Notes: {order.informations?.notes || "No Notes available."}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Payment Method:{" "}
                  {order.informations?.payment_method?.name || "No Payment Method available."}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Shipping Method:{" "}
                  {order.informations?.shipping_method?.name || "No Shipping Method available."}
                </p>
                <p
                  className={`mt-2 font-lexend text-sm ${getStatusColor(order.status)}`}
                >
                  Status: {order.status || "No Status available."}
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
