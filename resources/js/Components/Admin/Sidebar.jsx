import { Link } from "@inertiajs/react";
import { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBoxOpen,
  FaClipboardList,
  FaIndustry,
  FaChevronDown,
} from "react-icons/fa";

const Sidebar = ({ activeMenu, setActiveMenu, headerHome }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    // Sidebar
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
            className={`flex items-center rounded-lg p-2 ${
              activeMenu === "dashboard"
                ? "bg-custom-yellow font-lexend text-black"
                : "text-gray-600"
            }`}
          >
            <FaHome className="mr-2" />
            Dashboard
          </Link>
        </li>

        {/* Dropdown for Home Page Content */}
        <li>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${
              activeMenu === "home-page"
                ? "bg-custom-yellow font-lexend text-black"
                : "text-gray-600"
            }`}
          >
            <span className="flex items-center">
              <FaClipboardList className="mr-2" />
              Home Page Content
            </span>
            <FaChevronDown
              className={`ml-2 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          {/* Submenu (Dropdown Content) */}
          {dropdownOpen && (
            <ul className="ml-4 space-y-1">
              <li>
                <Link
                  href="/header-home"
                  onClick={() => setActiveMenu("header-home")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "header-home"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Header Home
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-flyer"
                  onClick={() => setActiveMenu("hero-flyer")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-flyer"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Flyer
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-company"
                  onClick={() => setActiveMenu("hero-company")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-company"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Company
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-why-choose"
                  onClick={() => setActiveMenu("hero-why-choose")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-why-choose"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Why Choose
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-maklon-value"
                  onClick={() => setActiveMenu("hero-maklon-value")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-maklon-value"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Maklon Value
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-team-value"
                  onClick={() => setActiveMenu("hero-team-value")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-team-value"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Team Value
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-facilities-value"
                  onClick={() => setActiveMenu("hero-facilities-value")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-facilities-value"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Facilities Value
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-certificate"
                  onClick={() => setActiveMenu("hero-certificate")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-certificate"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Certificate
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-service"
                  onClick={() => setActiveMenu("hero-service")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-service"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Service
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-video"
                  onClick={() => setActiveMenu("hero-video")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-video"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Video
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-excellence-value"
                  onClick={() => setActiveMenu("hero-excellence-value")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-excellence-value"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Excellence Value
                </Link>
              </li>
              <li>
                <Link
                  href="/hero-review"
                  onClick={() => setActiveMenu("hero-review")}
                  className={`flex items-center p-2 text-sm ${
                    activeMenu === "hero-review"
                      ? "bg-custom-yellow font-lexend text-black"
                      : "text-gray-600"
                  }`}
                >
                  Manage Hero Review
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link
            href="/about-us"
            onClick={() => setActiveMenu("about-us")}
            className={`flex items-center rounded-lg p-2 ${
              activeMenu === "about-us"
                ? "bg-custom-yellow font-lexend text-black"
                : "text-gray-600"
            }`}
          >
            <FaInfoCircle className="mr-2" />
            About Us Content
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            onClick={() => setActiveMenu("contact")}
            className={`flex items-center rounded-lg p-2 ${
              activeMenu === "contact"
                ? "bg-custom-yellow font-lexend text-black"
                : "text-gray-600"
            }`}
          >
            <FaEnvelope className="mr-2" />
            Contact Page Content
          </Link>
        </li>
        <li>
          <Link
            href="/product"
            onClick={() => setActiveMenu("product")}
            className={`flex items-center rounded-lg p-2 ${
              activeMenu === "product"
                ? "bg-custom-yellow font-lexend text-black"
                : "text-gray-600"
            }`}
          >
            <FaBoxOpen className="mr-2" />
            Product Page Content
          </Link>
        </li>
        <li>
          <Link
            href="/order"
            onClick={() => setActiveMenu("order")}
            className={`flex items-center rounded-lg p-2 ${
              activeMenu === "order"
                ? "bg-custom-yellow font-lexend text-black"
                : "text-gray-600"
            }`}
          >
            <FaClipboardList className="mr-2" />
            Order Page Content
          </Link>
        </li>
        <li>
          <Link
            href="/maklon"
            onClick={() => setActiveMenu("maklon")}
            className={`flex items-center rounded-lg p-2 ${
              activeMenu === "maklon"
                ? "bg-custom-yellow font-lexend text-black"
                : "text-gray-600"
            }`}
          >
            <FaIndustry className="mr-2" />
            Maklon Page Content
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
