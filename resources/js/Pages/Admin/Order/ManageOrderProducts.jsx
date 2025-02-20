import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const ManageOrderProducts = ({ orders = [], auth }) => {
  const { delete: deleteRecord } = useForm();
  const [activeMenu, setActiveMenu] = useState("manage-order-products");
  const user = auth.user;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#000000",
      scrollbarPadding: false,
      backdrop: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(`/orders/${id}`, {
          method: "DELETE",
        });
        Swal.fire({
          title: "Deleted!",
          text: "Order has been deleted.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
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
      <div className="mt-16 flex-1 bg-neutral-50 p-6">
        <Head title="Manage Order Products | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Manage Order Products</span>
        </nav>
        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Order Page Content
        </h2>
        {/* Table for Desktop */}
        <div className="hidden md:block">
          <h3 className="mb-4 font-lexend text-lg font-bold">Order Summary</h3>
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
                  Total Price
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
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
                      {order.recipient_name || "No recipient name available."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.notes || "No notes available."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      Rp{" "}
                      {parseFloat(order.total_price || 0).toLocaleString(
                        "id-ID",
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                      {order.status || "N/A"}
                    </td>
                    <td className="flex flex-col items-center justify-center space-y-2 whitespace-nowrap px-6 py-4 font-lexend text-sm font-medium">
                      {/* Edit Button with Icon */}
                      <Link
                        href={`/orders/${order.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <IoPencil size={20} />
                      </Link>
                      {/* Delete Button with Icon */}
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <IoTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile View */}
        <div className="block md:hidden">
        <h3 className="mb-4 font-lexend text-lg font-bold">Order Summary</h3>
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
                  <div className="flex items-center space-x-2">
                    {/* Edit Button with Icon */}
                    <Link
                      href={`/orders/${order.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <IoPencil size={20} />
                    </Link>
                    {/* Delete Button with Icon */}
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <IoTrash size={20} />
                    </button>
                  </div>
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
                  Recipient Name:{" "}
                  {order.recipient_name || "No recipient name available."}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Notes: {order.notes || "No notes available."}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
                  Total Price: Rp{" "}
                  {parseFloat(order.total_price || 0).toLocaleString("id-ID")}
                </p>
                <p className="mt-2 font-lexend text-sm text-gray-600">
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

export default ManageOrderProducts;
