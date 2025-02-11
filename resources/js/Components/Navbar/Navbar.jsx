import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import { FaChevronDown } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import Notification from "../Admin/Notification";

export default function Navbar({ auth }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const { url } = usePage();
  const user = auth?.user;

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/cart/items", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content"),
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch cart items: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      setCartItems(data.length);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Product", path: "/product" },
    { name: "Order", path: "/order" },
  ];

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? "bg-white text-gray-800" : "text-base-content bg-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 py-2 relative">
        {/* Logo */}
          <img
            className="w-14 md:w-14 flex items-center"
            src="/Navbar/NavbarLogo.png"
            alt="Logo"
          />

        {/* Navigation Links */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-10 text-sm md:text-base">
          {menuItems.map(({ name, path }) => (
            <Link
              key={path}
              href={path}
              className={`font-regular font-lexend transition-colors hover:text-gray-800 ${
                url === path ||
                (url.startsWith("/product") && path === "/product")
                  ? "font-lexend font-bold text-black"
                  : ""
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/*Notification and Cart Icon */}
        <div className="flex items-center">
          <div
            className={`relative flex items-center justify-center rounded-full p-2 transition-all duration-300 ${url === "/notifications" ? "border-2 border-custom-yellow text-black" : "hover:bg-gray-100"}`}
          >
            <Notification className="h-6 w-6 text-gray-700 transition-colors duration-300" />
          </div>
          <Link
            href="/carts"
            className={`relative flex items-center justify-center rounded-full p-2 transition-all duration-300 ${url === "/carts" ? "text-black" : "hover:bg-gray-100"}`}
          >
            <BsCart
              className={`h-6 w-6 transition-colors duration-300 ${url === "/carts" ? "text-black" : "text-gray-700"}`}
            />
            {cartItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartItems}
              </span>
            )}
          </Link>
          {/* Register & Login (Tampil jika user belum login dan bukan di halaman /carts) */}
          {!user && url !== "/carts" && (
            <div className="fle items-center gap-2">
              <Link
                href="/register"
                className="px-3 py-1 font-lexend text-sm text-gray-700 transition-all duration-300 hover:text-black"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-3 py-1 font-lexend text-sm text-gray-700 transition-all duration-300 hover:text-black"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Admin and Avatar */}
        {user && (
          <div className="flex items-center">
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
                  <Dropdown.Link href="/dashboard" className="font-lexend">
                    Dashboard
                  </Dropdown.Link>
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
        )}

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="absolute left-0 right-0 top-14 z-50 mt-2 rounded-md bg-white p-4 text-gray-800 md:hidden">
            {menuItems.map(({ name, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className={`block px-4 py-2 ${
                    url === path ||
                    (url.startsWith("/product") && path === "/product")
                      ? "font-bold"
                      : "font-regular"
                  } font-lexend hover:bg-gray-100`}
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
            {/* Dashboard Link in Mobile Menu */}
            {user && (
              <li>
                <Link
                  href="/dashboard"
                  className={`block px-4 py-2 ${
                    url === "/dashboard" ? "font-bold" : "font-regular"
                  } font-lexend hover:bg-gray-100`}
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
