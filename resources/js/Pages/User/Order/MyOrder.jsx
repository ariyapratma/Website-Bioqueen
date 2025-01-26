import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "@/Components/Admin/Sidebar";
import Searchbar from "@/Components/Admin/Searchbar";
import Notification from "@/Components/Admin/Notification";
import Dropdown from "@/Components/Dropdown";

const MyOrder = ({ orders, auth }) => {
  const [activeMenu, setActiveMenu] = useState("my-order");
  const user = auth.user;

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

        {/* Header */}
        <div className="mb-4 flex w-full items-center justify-between">
          {/* Back Button */}
          <Link
            href="/dashboard"
            className="rounded bg-custom-yellow px-4 py-2 text-black hover:bg-yellow-500"
          >
            <IoChevronBackOutline className="h-4 w-4" />
          </Link>

          {/* Search Bar */}
          <Searchbar />

          {/* Admin Notification and Avatar */}
          <div className="flex items-center">
            <Notification />
            <div className="relative ms-3">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent px-3 py-2 font-lexend text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                    >
                      {user?.name}
                      <img
                        src={`/storage/avatars/${auth.user.id}.png`}
                        alt={auth.user.name}
                        className="mx-2 h-10 w-10 rounded-full border border-custom-yellow"
                      />
                      <FaChevronDown
                        className="ml-2 h-2 w-2"
                        aria-hidden="true"
                      />
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Link
                    href={route("profile.edit")}
                    className="font-lexend"
                  >
                    Profile
                  </Dropdown.Link>
                  <Dropdown.Link
                    href={route("logout")}
                    className="font-lexend"
                    method="post"
                    as="button"
                  >
                    Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* Order Table */}
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  {order.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  Rp {parseFloat(order.total_price).toLocaleString("id-ID")}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
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
                    {order.status === "Pending" && "⏳ Pending"}
                    {order.status === "Processing" && "🔄 Processing"}
                    {order.status === "Completed" && "✅ Completed"}
                    {order.status === "Cancelled" && "❌ Cancelled"}
                    {!order.status && "Unknown"}
                  </span>
                </td>
              </tr>
            ))}

            {/* Order Items Section */}
            {orders.map((order) => (
              <tr key={`${order.id}-items`}>
                <td
                  colSpan={4}
                  className="border-t bg-gray-50 px-6 py-4 text-left text-sm text-gray-700"
                >
                  <strong>Order Items:</strong>
                  <table className="mt-2 w-full border-collapse border border-gray-200">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 text-left text-xs font-medium uppercase text-gray-600">
                          Product Name
                        </th>
                        <th className="border px-4 py-2 text-left text-xs font-medium uppercase text-gray-600">
                          Unit Price
                        </th>
                        <th className="border px-4 py-2 text-left text-xs font-medium uppercase text-gray-600">
                          Quantity
                        </th>
                        <th className="border px-4 py-2 text-left text-xs font-medium uppercase text-gray-600">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                            {order.id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                            Rp{" "}
                            {parseFloat(order.total_price).toLocaleString(
                              "id-ID",
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
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
                              {order.status === "Pending" && "⏳ Pending"}
                              {order.status === "Processing" && "🔄 Processing"}
                              {order.status === "Completed" && "✅ Completed"}
                              {order.status === "Cancelled" && "❌ Cancelled"}
                              {!order.status && "Unknown"}
                            </span>
                          </td>
                        </tr>
                      ))}

                      {/* Order Items Section */}
                      {orders.map((order) => (
                        <tr key={`${order.id}-items`}>
                          <td
                            colSpan={4}
                            className="border-t bg-gray-50 px-6 py-4 text-left text-sm text-gray-700"
                          >
                            <strong>Order Items:</strong>
                            <table className="mt-2 w-full border-collapse border border-gray-200">
                              <thead>
                                <tr>
                                  <th className="border px-4 py-2 text-left text-xs font-medium uppercase text-gray-600">
                                    Product Name
                                  </th>
                                  <th className="border px-4 py-2 text-left text-xs font-medium uppercase text-gray-600">
                                    Unit Price
                                  </th>
                                  <th className="border px-4 py-2 text-left text-xs font-medium uppercase text-gray-600">
                                    Quantity
                                  </th>
                                  <th className="border px-4 py-2 text-left text-xs font-medium uppercase text-gray-600">
                                    Subtotal
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {Array.isArray(order.orderItems) ? (
                                  order.orderItems.map((item, index) => (
                                    <tr key={index}>
                                      <td className="border px-4 py-2 text-sm text-gray-700">
                                        {item?.product?.name || "N/A"}
                                      </td>
                                      <td className="border px-4 py-2 text-sm text-gray-700">
                                        Rp{" "}
                                        {parseFloat(
                                          item?.product?.price || 0,
                                        ).toLocaleString("id-ID")}
                                      </td>
                                      <td className="border px-4 py-2 text-sm text-gray-700">
                                        {item?.quantity || 0}
                                      </td>
                                      <td className="border px-4 py-2 text-sm text-gray-700">
                                        Rp{" "}
                                        {parseFloat(
                                          (item?.product?.price || 0) *
                                            (item?.quantity || 0),
                                        ).toLocaleString("id-ID")}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="border px-4 py-2 text-center text-sm text-gray-700"
                                    >
                                      No items available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
