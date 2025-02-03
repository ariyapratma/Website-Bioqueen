import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "@/Components/Admin/Sidebar";
import Searchbar from "@/Components/Admin/Searchbar";
import Notification from "@/Components/Admin/Notification";
import Dropdown from "@/Components/Dropdown";

const MyOrder = ({ orders = [], auth }) => {
  const [activeMenu, setActiveMenu] = useState("my-order");
  const user = auth?.user;

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
                        src={`/storage/avatars/${user?.id}.png`}
                        alt={user?.name || "User"}
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

        {/* Order Status */}
        <div className="mb-6 mt-8 text-center">
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
        <h2 className="mb-4 font-lexend text-xl font-bold">Order Summary</h2>
        {/* Order Summary */}
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  {order.product_id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  {order.product?.name || "Product name not available"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  <img
                    src={`/storage/${order.product?.image_url}`}
                    alt={order.name}
                    className="h-24 w-24 rounded-t-lg object-contain"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  Rp {parseFloat(order.total_price).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Title */}
        <h2 className="mb-4 mt-4 font-lexend text-xl font-bold">
          Order Details
        </h2>
        {/* Order Details */}
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium tracking-wider text-gray-500">
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                Notes
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
                  {new Date(order.created_at).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  {order.orderInformation?.notes}
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
