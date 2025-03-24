import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaBoxOpen,
  FaClipboardList,
  FaChevronDown,
} from "react-icons/fa";

const Sidebar = ({ activeMenu, setActiveMenu, auth }) => {
  const user = auth?.user;
  if (!user) {
    return null;
  }
  const [dropdownHomeOpen, setDropdownHomeOpen] = useState(false);
  const [dropdownAboutUsOpen, setDropdownAboutUsOpen] = useState(false);
  const [dropdownProductOpen, setDropdownProductOpen] = useState(false);
  const [dropdownOrderOpen, setDropdownOrderOpen] = useState(false);
  const [dropdownMyOrderOpen, setDropdownMyOrderOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
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
      activeMenu.startsWith("admin/hero-review"),
    );

    setDropdownAboutUsOpen(
      activeMenu.startsWith("about-us") ||
      activeMenu.startsWith("header-about-us") ||
      activeMenu.startsWith("hero-about-us") ||
      activeMenu.startsWith("hero-vision-mision") ||
      activeMenu.startsWith("hero-our-gallery") ||
      activeMenu.startsWith("header-maklon") ||
      activeMenu.startsWith("header-contact"),
    );

    setDropdownProductOpen(
      activeMenu.startsWith("product") ||
      activeMenu.startsWith("header-product") ||
      activeMenu.startsWith("hero-categories") ||
      activeMenu.startsWith("product-list"),
    );

    setDropdownOrderOpen(
      activeMenu.startsWith("order") ||
      activeMenu.startsWith("header-order") ||
      activeMenu.startsWith("manage-order-products"),
    );

    setDropdownMyOrderOpen(
      activeMenu.startsWith("my-order") || activeMenu.startsWith("my-order"),
    );
  }, [activeMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target)) {
        setCollapsed(true);
        setDropdownHomeOpen(false);
        setDropdownAboutUsOpen(false);
        setDropdownProductOpen(false);
        setDropdownOrderOpen(false);
        setDropdownMyOrderOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setDropdownHomeOpen(false);
    setDropdownAboutUsOpen(false);
    setDropdownProductOpen(false);
    setDropdownOrderOpen(false);
  };

  const toggleDropdownHome = () => {
    if (collapsed) {
      setCollapsed(false);
    }
    setDropdownHomeOpen(!dropdownHomeOpen);
  };

  const toggleDropdownAboutUs = () => {
    if (collapsed) {
      setCollapsed(false);
    }
    setDropdownAboutUsOpen(!dropdownAboutUsOpen);
  };

  const toggleDropdownProduct = () => {
    if (collapsed) {
      setCollapsed(false);
    }
    setDropdownProductOpen(!dropdownProductOpen);
  };

  const toggleDropdownOrder = () => {
    if (collapsed) {
      setCollapsed(false);
    }
    setDropdownOrderOpen(!dropdownOrderOpen);
  };

  const toggleDropdownMyOrder = () => {
    if (collapsed) {
      setCollapsed(false);
    }
    setDropdownMyOrderOpen(!dropdownMyOrderOpen);
  };

  return (
    <div
      id="sidebar"
      className={`flex flex-col items-center bg-white p-4 transition-all duration-300 ${collapsed ? "w-24" : "w-48"
        }`}
    >
      {/* Header Sidebar */}
      <div
        className="mt-12 flex w-full cursor-pointer items-center justify-center"
        onClick={toggleSidebar}
      ></div>

      {/* Menu Items */}
      <ul className="mt-4 w-full space-y-2">
        {/* Dashboard */}
        <li>
          <Link
            href="/dashboard"
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu("dashboard");
            }}
            className={`flex items-center rounded-lg p-2 ${activeMenu === "dashboard"
              ? "bg-custom-yellow text-black"
              : "text-gray-600 hover:bg-gray-100"
              } transition duration-300`}
          >
            <FaHome className="mr-2" />
            {!collapsed && "Dashboard"}
          </Link>
        </li>

        {/* Dropdown for Home Page Content */}
        {user.role === "admin" && (
          <li>
            <div
              onClick={toggleDropdownHome}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${dropdownHomeOpen ||
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
                activeMenu.startsWith("admin/hero-review")
                ? "bg-custom-yellow text-black"
                : "text-gray-600 hover:bg-gray-100"
                } transition duration-300`}
            >
              <span className="flex items-center">
                <FaClipboardList className="mr-2" />
                {!collapsed && "Home Page Content"}
              </span>
              {!collapsed && (
                <FaChevronDown
                  className={`ml-2 transition-transform duration-300 ${dropdownHomeOpen ? "rotate-180" : ""
                    }`}
                />
              )}
            </div>

            {/* Submenu (Dropdown Content) */}
            {!collapsed && dropdownHomeOpen && (
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
                  "admin/hero-review",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item}`}
                      onClick={() => setActiveMenu(item)}
                      className={`flex items-center rounded-lg p-2 text-sm ${activeMenu === item
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                        } transition duration-300`}
                    >
                      {!collapsed &&
                        `Manage ${item
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}`}
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
              onClick={toggleDropdownAboutUs}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${dropdownAboutUsOpen ||
                activeMenu.startsWith("header-about-us") ||
                activeMenu.startsWith("hero-about-us") ||
                activeMenu.startsWith("hero-vision-mision") ||
                activeMenu.startsWith("hero-our-gallery") ||
                activeMenu.startsWith("header-maklon") ||
                activeMenu.startsWith("header-contact")
                ? "bg-custom-yellow text-black"
                : "text-gray-600 hover:bg-gray-100"
                } transition duration-300`}
            >
              <span className="flex items-center">
                <FaInfoCircle className="mr-2" />
                {!collapsed && "AboutUs Page Content"}
              </span>
              {!collapsed && (
                <FaChevronDown
                  className={`ml-2 transition-transform duration-300 ${dropdownAboutUsOpen ? "rotate-180" : ""
                    }`}
                />
              )}
            </div>

            {/* Submenu (Dropdown Content) */}
            {!collapsed && dropdownAboutUsOpen && (
              <ul className="ml-4 space-y-1">
                {/* Daftar submenu di sini */}
                {[
                  "header-about-us",
                  "hero-about-us",
                  "hero-vision-mision",
                  "hero-our-gallery",
                  "header-maklon",
                  "header-contact",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item}`}
                      onClick={() => setActiveMenu(item)}
                      className={`flex items-center rounded-lg p-2 text-sm ${activeMenu === item
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                        } transition duration-300`}
                    >
                      {!collapsed &&
                        `Manage ${item
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}`}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}

        {/* Dropdown for Product Page Content */}
        {user.role === "admin" && (
          <li>
            <div
              onClick={toggleDropdownProduct}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${dropdownProductOpen ||
                activeMenu.startsWith("header-product") ||
                activeMenu.startsWith("hero-categories") ||
                activeMenu.startsWith("product-list")
                ? "bg-custom-yellow text-black"
                : "text-gray-600 hover:bg-gray-100"
                } transition duration-300`}
            >
              <span className="flex items-center">
                <FaBoxOpen className="mr-2" />
                {!collapsed && "Product Content"}
              </span>
              {!collapsed && (
                <FaChevronDown
                  className={`ml-2 transition-transform duration-300 ${dropdownProductOpen ? "rotate-180" : ""
                    }`}
                />
              )}
            </div>

            {/* Submenu (Dropdown Content) */}
            {!collapsed && dropdownProductOpen && (
              <ul className="ml-4 space-y-1">
                {/* Daftar submenu di sini */}
                {["header-product", "hero-categories", "product-list"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`/${item}`}
                        onClick={() => setActiveMenu(item)}
                        className={`flex items-center rounded-lg p-2 text-sm ${activeMenu === item
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-100"
                          } transition duration-300`}
                      >
                        {!collapsed &&
                          `Manage ${item
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}`}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            )}
          </li>
        )}

        {/* Dropdown for Order Page Content */}
        {user.role === "admin" && (
          <li>
            <div
              onClick={toggleDropdownOrder}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${dropdownOrderOpen ||
                activeMenu.startsWith("header-order") ||
                activeMenu.startsWith("manage-order-products")
                ? "bg-custom-yellow text-black"
                : "text-gray-600 hover:bg-gray-100"
                } transition duration-300`}
            >
              <span className="flex items-center">
                <FaClipboardList className="mr-2" />
                {!collapsed && "Order Page Content"}
              </span>
              {!collapsed && (
                <FaChevronDown
                  className={`ml-2 transition-transform duration-300 ${dropdownOrderOpen ? "rotate-180" : ""
                    }`}
                />
              )}
            </div>

            {/* Submenu (Dropdown Content) */}
            {!collapsed && dropdownOrderOpen && (
              <ul className="ml-4 space-y-1">
                {/* Daftar submenu di sini */}
                {["header-order", "manage-order-products"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item}`}
                      onClick={() => setActiveMenu(item)}
                      className={`flex items-center rounded-lg p-2 text-sm ${activeMenu === item
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                        } transition duration-300`}
                    >
                      {!collapsed &&
                        `Manage ${item
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}`}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}

        {/* Dropdown for MyOrder Page Content */}
        {user.role === "user" && (
          <li>
            <div
              onClick={toggleDropdownMyOrder}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 ${dropdownMyOrderOpen || activeMenu.startsWith("my-order")
                ? "bg-custom-yellow text-black"
                : "text-gray-600 hover:bg-gray-100"
                } transition duration-300`}
            >
              <span className="flex items-center">
                <FaClipboardList className="mr-2" />
                {!collapsed && " Order"}
              </span>
              {!collapsed && (
                <FaChevronDown
                  className={`ml-2 transition-transform duration-300 ${dropdownMyOrderOpen ? "rotate-180" : ""
                    }`}
                />
              )}
            </div>

            {/* Submenu (Dropdown Content) */}
            {!collapsed && dropdownMyOrderOpen && (
              <ul className="ml-4 space-y-1">
                {/* Daftar submenu di sini */}
                {["my-order"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item}`}
                      onClick={() => setActiveMenu(item)}
                      className={`flex items-center rounded-lg p-2 text-sm ${activeMenu === item
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                        } transition duration-300`}
                    >
                      {!collapsed &&
                        `${item
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}`}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
