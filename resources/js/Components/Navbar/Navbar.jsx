import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar({ user }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { url } = usePage(); // Mengambil URL halaman saat ini

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                url === path ? "font-lexend font-bold text-black" : ""
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
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute left-0 right-0 top-14 z-50 mt-2 rounded-md bg-white p-4 text-gray-800 md:hidden">
          {menuItems.map(({ name, path }) => (
            <li key={path}>
              <Link
                href={path}
                className={`block px-4 py-2 ${
                  url === path ? "font-bold" : "font-regular"
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
            <li className="flex flex-col items-center mt-4">
              <img
                className="w-10 h-10 rounded-full"
                src={user.avatar || "default-avatar.png"}
                alt="User Avatar"
              />
              <div className="pt-2">
                <div className="font-lexend font-medium text-base text-gray-800">{user.name}</div>
                <div className="font-lexend font-medium text-sm text-gray-500">{user.email}</div>
              </div>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
