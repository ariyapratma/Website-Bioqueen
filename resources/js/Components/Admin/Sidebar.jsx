import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBoxOpen,
  FaClipboardList,
  FaIndustry,
  FaChevronDown,
} from "react-icons/fa";

const Sidebar = ({ activeMenu, setActiveMenu, auth }) => {
  const user = auth?.user;
  if (!user) {
    return null;
  }
  const [dropdownHomeOpen, setDropdownHomeOpen] = useState(false);
  const [dropdownAboutUsOpen, setDropdownAboutUsOpen] = useState(false);
  const [dropdownContactOpen, setDropdownContactOpen] = useState(false);
  const [dropdownProductOpen, setDropdownProductOpen] = useState(false);
  const [dropdownOrderOpen, setDropdownOrderOpen] = useState(false);
  const [dropdownMyOrderOpen, setDropdownMyOrderOpen] = useState(false);
  const [dropdownMaklonOpen, setDropdownMaklonOpen] = useState(false);

  useEffect(() => {
    // Buka dropdown Home jika ada submenu yang aktif
    setDropdownHomeOpen(
      activeMenu.startsWith("home-page") ||
        activeMenu.startsWith("header-home") ||
        activeMenu.startsWith("hero-flyer") ||
        activeMenu.startsWith("hero-company") ||
        activeMenu.startsWith("hero-why-choose") ||
        activeMenu.startsWith("hero-maklon-value") ||
        activeMenu.startsWith("hero-team-value") ||
        activeMenu.startsWith("hero-facilities-value") ||
        activeMenu.startsWith("hero-certificate") ||
        activeMenu.startsWith("hero-service") ||
        activeMenu.startsWith("hero-video") ||
        activeMenu.startsWith("hero-excellence-value") ||
        activeMenu.startsWith("hero-review"),
    );

    // Buka dropdown About Us jika ada submenu yang aktif
    setDropdownAboutUsOpen(
      activeMenu.startsWith("about-us") ||
        activeMenu.startsWith("header-about-us") ||
        activeMenu.startsWith("hero-about-us") ||
        activeMenu.startsWith("hero-vision-mision") ||
        activeMenu.startsWith("hero-our-gallery"),
    );

    // Buka dropdown Contact jika ada submenu yang aktif
    setDropdownContactOpen(
      activeMenu.startsWith("contact") ||
        activeMenu.startsWith("header-contact"),
    );

    // Buka dropdown Product jika ada submenu yang aktif
    setDropdownProductOpen(
      activeMenu.startsWith("product") ||
        activeMenu.startsWith("header-product") ||
        activeMenu.startsWith("hero-categories") ||
        activeMenu.startsWith("product-list"),
    );

    // Buka dropdown Order jika ada submenu yang aktif
    setDropdownOrderOpen(
      activeMenu.startsWith("order") ||
        activeMenu.startsWith("header-order") ||
        activeMenu.startsWith("manage-order-products"),
    );

    // Buka dropdown MyOrder jika ada submenu yang aktif
    setDropdownMyOrderOpen(
      activeMenu.startsWith("my-order-details") ||
        activeMenu.startsWith("my-order"),
    );

    // Buka dropdown Maklon jika ada submenu yang aktif
    setDropdownMaklonOpen(
      activeMenu.startsWith("maklon") || activeMenu.startsWith("header-maklon"),
    );
  }, [activeMenu]);

  return (
    <div className="bg-neutral-70 flex w-48 flex-col items-center p-4 shadow-lg">
      <h2 className="mb-4 mt-12 font-lexend text-lg font-bold text-black"></h2>
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
        {user.role === "admin" && (
          <li>
            <div
              onClick={() => setDropdownHomeOpen(!dropdownHomeOpen)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${
                dropdownHomeOpen || activeMenu.startsWith("home-page")
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
                  dropdownHomeOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* Submenu (Dropdown Content) */}
            {dropdownHomeOpen && (
              <ul className="ml-4 space-y-1">
                {/* Daftar submenu di sini */}
                {[
                  "header-home",
                  "hero-flyer",
                  "hero-company",
                  "hero-why-choose",
                  "hero-maklon-value",
                  "hero-team-value",
                  "hero-facilities-value",
                  "hero-certificate",
                  "hero-service",
                  "hero-video",
                  "hero-excellence-value",
                  "hero-review",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item}`}
                      onClick={() => setActiveMenu(item)}
                      className={`flex items-center p-2 text-sm ${
                        activeMenu === item
                          ? "bg-custom-yellow font-lexend text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Manage{" "}
                      {item
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}

        {/* Dropdown for About Us Page Content */}
        {user.role === "admin" && (
          <li>
            <div
              onClick={() => setDropdownAboutUsOpen(!dropdownAboutUsOpen)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${
                dropdownAboutUsOpen || activeMenu.startsWith("about-us")
                  ? "bg-custom-yellow font-lexend text-black"
                  : "text-gray-600"
              }`}
            >
              <span className="flex items-center">
                <FaInfoCircle className="mr-2" />
                AboutUs Page Content
              </span>
              <FaChevronDown
                className={`ml-2 transition-transform ${
                  dropdownAboutUsOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* Submenu (Dropdown Content) */}
            {dropdownAboutUsOpen && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/header-about-us"
                    onClick={() => setActiveMenu("header-about-us")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "header-about-us"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Header About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hero-about-us"
                    onClick={() => setActiveMenu("hero-about-us")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "hero-about-us"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Hero About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hero-vision-mision"
                    onClick={() => setActiveMenu("hero-vision-mision")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "hero-vision-mision"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Hero Vision Mision
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hero-our-gallery"
                    onClick={() => setActiveMenu("hero-our-gallery")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "hero-our-gallery"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Hero Our Gallery
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Dropdown for Contact Page Content */}
        {user.role === "admin" && (
          <li>
            <div
              onClick={() => setDropdownContactOpen(!dropdownContactOpen)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${
                dropdownContactOpen || activeMenu.startsWith("contact")
                  ? "bg-custom-yellow font-lexend text-black"
                  : "text-gray-600"
              }`}
            >
              <span className="flex items-center">
                <FaEnvelope className="mr-2" />
                Contact Page Content
              </span>
              <FaChevronDown
                className={`ml-2 transition-transform ${
                  dropdownContactOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* Submenu (Dropdown Content) */}
            {dropdownContactOpen && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/header-contact"
                    onClick={() => setActiveMenu("header-contact")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "header-contact"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Header Contact
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Dropdown for Product Page Content */}
        {user.role === "admin" && (
          <li>
            <div
              onClick={() => setDropdownProductOpen(!dropdownProductOpen)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${
                dropdownProductOpen || activeMenu.startsWith("product")
                  ? "bg-custom-yellow font-lexend text-black"
                  : "text-gray-600"
              }`}
            >
              <span className="flex items-center">
                <FaBoxOpen className="mr-2" />
                Product Content
              </span>
              <FaChevronDown
                className={`ml-2 transition-transform ${
                  dropdownProductOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* Submenu (Dropdown Content) */}
            {dropdownProductOpen && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/header-product"
                    onClick={() => setActiveMenu("header-product")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "header-product"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Header Product
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hero-categories"
                    onClick={() => setActiveMenu("hero-categories")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "hero-categories"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Hero Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/product-list"
                    onClick={() => setActiveMenu("product-list")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "product-list"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Product List
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Dropdown for Order Page Content */}
        {user.role === "admin" && (
          <li>
            <div
              onClick={() => setDropdownOrderOpen(!dropdownOrderOpen)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${
                dropdownOrderOpen || activeMenu.startsWith("order")
                  ? "bg-custom-yellow font-lexend text-black"
                  : "text-gray-600"
              }`}
            >
              <span className="flex items-center">
                <FaClipboardList className="mr-2" />
                Order Page Content
              </span>
              <FaChevronDown
                className={`ml-2 transition-transform ${
                  dropdownOrderOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* Submenu (Dropdown Content) */}
            {dropdownOrderOpen && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/header-order"
                    onClick={() => setActiveMenu("header-order")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "header-order"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Header Order
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manage-order-products"
                    onClick={() => setActiveMenu("manage-order-products")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "manage-order-products"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Order Products
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Dropdown for Maklon Page Content */}
        {user.role === "admin" && (
          <li>
            <div
              onClick={() => setDropdownMaklonOpen(!dropdownMaklonOpen)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${
                dropdownMaklonOpen || activeMenu.startsWith("maklon")
                  ? "bg-custom-yellow font-lexend text-black"
                  : "text-gray-600"
              }`}
            >
              <span className="flex items-center">
                <FaIndustry className="mr-2" />
                Maklon Page Content
              </span>
              <FaChevronDown
                className={`ml-2 transition-transform ${
                  dropdownMaklonOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* Submenu (Dropdown Content) */}
            {dropdownMaklonOpen && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/header-maklon"
                    onClick={() => setActiveMenu("header-maklon")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "header-maklon"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Header Maklon
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Dropdown for My Order Page Content */}
        {user.role === "user" && (
          <li>
            <div
              onClick={() => setDropdownMyOrderOpen(!dropdownMyOrderOpen)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${
                dropdownMyOrderOpen
                  ? "bg-custom-yellow font-lexend text-black"
                  : "text-gray-600"
              }`}
            >
              <span className="flex items-center">
                <FaClipboardList className="mr-2" />
                My Order Details
              </span>
              <FaChevronDown
                className={`ml-2 transition-transform ${
                  dropdownMyOrderOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* Submenu (Dropdown Content) */}
            {dropdownMyOrderOpen && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/my-order"
                    onClick={() => setActiveMenu("my-order")}
                    className={`flex items-center p-2 text-sm ${
                      activeMenu === "my-order"
                        ? "bg-custom-yellow font-lexend text-black"
                        : "text-gray-600"
                    }`}
                  >
                    Manage Order Details
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
