import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBoxOpen,
  FaClipboardList,
  FaIndustry,
} from "react-icons/fa";
import { RiNotification4Line } from "react-icons/ri";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

const CreateHeaderHome = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    image_url: "",
    whatsapp_link: "",
  });

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/header-home/create") {
      setActiveMenu("header-home/create");
    }
  }, []);

  const [activeMenu, setActiveMenu] = useState("header-home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/header-home", {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Header Home has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/header-home";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Header Home.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
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
                    href="/header-home/{id}/edit" // Pastikan untuk mengganti {id} dengan id yang sesuai
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
        <Head title="Create Header Home | PT Ratu Bio Indonesia" />

        {/* Header */}
        <div className="mb-4 flex w-full items-center justify-between">
          <Link
            href="/header-home"
            className="rounded bg-custom-yellow px-4 py-2 text-black hover:bg-yellow-500"
          >
            <IoChevronBackOutline className="h-4 w-4" />
          </Link>

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
          Create Home Page Content
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.title && (
              <span className="text-sm text-red-600">{errors.title}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="4"
              required
            />
            {errors.description && (
              <span className="text-sm text-red-600">{errors.description}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="image_url"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              id="image_url"
              type="text"
              value={data.image_url}
              onChange={(e) => setData("image_url", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.image_url && (
              <span className="text-sm text-red-600">{errors.image_url}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="whatsapp_link"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              WhatsApp Link
            </label>
            <input
              id="whatsapp_link"
              type="text"
              value={data.whatsapp_link}
              onChange={(e) => setData("whatsapp_link", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.whatsapp_link && (
              <span className="text-sm text-red-600">
                {errors.whatsapp_link}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow py-2 font-lexend font-semibold text-white hover:bg-yellow-600"
          >
            {processing ? "Saving..." : "Save Header Home"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHeaderHome;
