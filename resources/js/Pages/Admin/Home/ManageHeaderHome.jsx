import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBoxOpen,
  FaClipboardList,
  FaIndustry,
} from "react-icons/fa";
import { RiNotification4Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

const ManageHeaderHome = ({ dataHeaderHome }) => {
  const { delete: deleteRecord } = useForm();
  const [activeMenu, setActiveMenu] = useState("header-home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(`/header-home/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex w-48 flex-col items-center bg-white p-4 shadow-lg">
        <h2 className="mb-4 font-lexend text-lg font-bold text-black">
          <Link href="/">
            <img
              src="/LogoDashboardAdmin/LogoDashboardAdmin.jpeg"
              loading="lazy"
              className="block h-20 w-auto"
            />
          </Link>
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              onClick={() => setActiveMenu("dashboard")}
              className={`flex items-center rounded-lg p-2 ${activeMenu === "dashboard" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
            >
              <FaHome className="mr-2" />
              Dashboard
            </Link>
          </li>

          {/* Dropdown for Home Page Content */}
          <li>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${activeMenu === "home-page" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
            >
              <span className="flex items-center">
                <FaClipboardList className="mr-2" />
                Home Page Content
              </span>
              <FaChevronDown
                className={`ml-2 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </div>
            {/* Submenu (Dropdown Content) */}
            {dropdownOpen && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/header-home"
                    onClick={() => setActiveMenu("header-home")}
                    className={`flex items-center p-2 text-sm ${activeMenu === "header-home" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
                  >
                    Manage Header Home
                  </Link>
                  <Link
                    href="/header-home/create"
                    onClick={() => setActiveMenu("header-home")}
                    className={`flex items-center p-2 text-sm ${activeMenu === "header-home/create" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
                  >
                    Create Header Home
                  </Link>
                  <Link
                    href="/header-home/${headerHome.id}/edit" // Pastikan untuk mengganti {id} dengan id yang sesuai
                    onClick={() => setActiveMenu("header-home")}
                    className={`flex items-center p-2 text-sm ${activeMenu === "header-home/edit" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
                  >
                    Edit Header Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hero-flyer"
                    onClick={() => setActiveMenu("hero-flyer")}
                    className={`flex items-center p-2 text-sm ${activeMenu === "hero-flyer" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
                  >
                    Manage Hero Flyer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hero-company"
                    onClick={() => setActiveMenu("hero-company")}
                    className={`flex items-center p-2 text-sm ${activeMenu === "hero-company" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
                  >
                    Manage Hero Company
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hero-why-choose"
                    onClick={() => setActiveMenu("hero-why-choose")}
                    className={`flex items-center p-2 text-sm ${activeMenu === "hero-why-choose" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
                  >
                    Manage Hero Why Choose
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hero-maklon-value"
                    onClick={() => setActiveMenu("hero-maklon-value")}
                    className={`flex items-center p-2 text-sm ${activeMenu === "hero-maklon-value" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
                  >
                    Manage Hero Maklon Value
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hero-facilities-value"
                    onClick={() => setActiveMenu("hero-facilities-value")}
                    className={`flex items-center p-2 text-sm ${activeMenu === "hero-facilities-value" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
                  >
                    Manage Hero Facilities Value
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hero-certificate"
                    onClick={() => setActiveMenu("hero-certificate")}
                    className={`flex items-center p-2 text-sm ${activeMenu === "hero-certificate" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
                  >
                    Manage Hero Certificate
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              href="/about-us"
              onClick={() => setActiveMenu("about-us")}
              className={`flex items-center rounded-lg p-2 ${activeMenu === "about-us" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
            >
              <FaInfoCircle className="mr-2" />
              About Us Content
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setActiveMenu("contact")}
              className={`flex items-center rounded-lg p-2 ${activeMenu === "contact" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
            >
              <FaEnvelope className="mr-2" />
              Contact Page Content
            </Link>
          </li>
          <li>
            <Link
              href="/product"
              onClick={() => setActiveMenu("product")}
              className={`flex items-center rounded-lg p-2 ${activeMenu === "product" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
            >
              <FaBoxOpen className="mr-2" />
              Product Page Content
            </Link>
          </li>
          <li>
            <Link
              href="/order"
              onClick={() => setActiveMenu("order")}
              className={`flex items-center rounded-lg p-2 ${activeMenu === "order" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
            >
              <FaClipboardList className="mr-2" />
              Order Page Content
            </Link>
          </li>
          <li>
            <Link
              href="/maklon"
              onClick={() => setActiveMenu("maklon")}
              className={`flex items-center rounded-lg p-2 ${activeMenu === "maklon" ? "bg-custom-yellow font-lexend text-black" : "text-gray-600"}`}
            >
              <FaIndustry className="mr-2" />
              Maklon Page Content
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="Manage Header Home | PT Ratu Bio Indonesia" />

        {/* Header */}
        <div className="mb-4 flex w-full items-center justify-between">
          {/* Back Button on the Left */}
          <Link
            href="/dashboard"
            className="rounded bg-custom-yellow px-4 py-2 text-black hover:bg-yellow-500"
          >
            <IoChevronBackOutline className="h-4 w-4" />
          </Link>

          {/* Search Bar */}
          <div className="mx-4 flex w-1/3 items-center">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 rounded-lg border border-gray-300 p-2 pl-10 font-lexend"
            />
            <CiSearch className="pointer-events-none absolute ml-2 text-gray-500" />
          </div>

          {/* Admin Logo and Notification */}
          <div className="flex items-center">
            <RiNotification4Line className="mr-4 h-6 w-6 cursor-pointer overflow-hidden rounded-md bg-white text-neutral-400" />
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Admin Avatar"
              className="h-10 w-10 rounded-full"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Home Page Content
        </h2>

        {/* Table */}
        <div className="mb-6 flex justify-end">
          <Link
            href="/header-home/create"
            className="rounded bg-custom-yellow px-4 py-2 font-lexend text-black hover:bg-yellow-500"
          >
            Add New Header
          </Link>
        </div>

        <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Title
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Description
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Image URL
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                WhatsApp Link
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {dataHeaderHome.map((headerHome) => (
              <tr key={headerHome.id}>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  {headerHome.title}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  {headerHome.description}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  <a
                    href={headerHome.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Image
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  <a
                    href={headerHome.whatsapp_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    WhatsApp
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm font-medium">
                  <Link
                    href={`/header-home/${headerHome.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(headerHome.id)}
                    className="ml-4 text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageHeaderHome;
