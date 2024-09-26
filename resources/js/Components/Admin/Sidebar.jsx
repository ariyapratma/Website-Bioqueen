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

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const [dropdownHomeOpen, setDropdownHomeOpen] = useState(false);
  const [dropdownAboutUsOpen, setDropdownAboutUsOpen] = useState(false);

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
  }, [activeMenu]);

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

        {/* Dropdown for About Us Page Content */}
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
              About Us Content
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
