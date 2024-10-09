import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import { FaChevronDown } from "react-icons/fa";
import { BsCart } from "react-icons/bs";

export default function Navbar({ auth, cartItems }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { url } = usePage();
  const user = auth.user;

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Product", path: "/product" },
    { name: "Order", path: "/order" },
    { name: "Maklon", path: "/maklon" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  const addToCart = (item) => {
    setCartItems((prevItems) => prevItems + 1);
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? "bg-white text-gray-800" : "text-base-content bg-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-2 md:p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            className="w-14 md:w-16"
            src="/Navbar/NavbarLogo.png"
            alt="Logo"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden flex-grow justify-center gap-6 text-sm md:flex md:text-base">
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
          {/* Dashboard Link */}
          {user && (
            <Link
              href="/dashboard"
              className={`font-regular font-lexend transition-colors hover:text-gray-800 ${
                url === "/dashboard" ? "font-lexend font-bold text-black" : ""
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Cart Icon */}
        <div className="flex items-center">
          <Link
            href="/carts"
            className="relative text-gray-700 hover:text-gray-800"
          >
            <BsCart className="h-6 w-6" />
            {cartItems > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                {cartItems}
              </span>
            )}
          </Link>
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
            {/* Avatar and User Info in Mobile Menu */}
            {user && (
              <li className="mt-4 flex flex-col items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src={`/storage/avatars/${auth.user.id}.png`}
                  alt={auth.user.name}
                />
                <div className="pt-2">
                  <div className="font-lexend text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="font-lexend text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
