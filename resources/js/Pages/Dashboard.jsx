import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

export default function Dashboard({ auth }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = auth.user;

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
      <div className="mt-16 flex-1 bg-neutral-50 p-6">
        <Head title="Dashboard | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />

        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
          </span>
        </nav>

        {/* Ucapan Selamat Datang */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
          <h2 className="text-lg font-bold text-gray-800">
            Selamat Datang, {user?.name}!
          </h2>
        </div>

        {/* Title Dashboard */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Dashboard {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </h2>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Admin Cards */}
          {user.role === "admin" && (
            <div className="w-full rounded-lg bg-white p-4 shadow-md">
              <h3 className="font-lexend text-lg font-semibold">
                User Information
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-700">Name: {user.name}</p>
                <p className="text-sm text-gray-700">Email: {user.email}</p>
              </div>
            </div>
          )}

          {/* User Cards */}
          {user.role === "user" && (
            <div className="w-full rounded-lg bg-white p-4 shadow-md">
              <h3 className="font-lexend text-lg font-semibold">
                User Information
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-700">Name: {user.name}</p>
                <p className="text-sm text-gray-700">Email: {user.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
