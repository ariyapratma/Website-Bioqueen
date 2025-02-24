import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Sidebar from "@/Components/Admin/Sidebar";
import Swal from "sweetalert2";
import Navbar from "@/Components/Navbar/Navbar";

export default function Dashboard({ auth }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = auth.user;

  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: `Selamat Datang, ${user?.name}!`,
      confirmButtonText: "OK",
      confirmButtonColor: "#000000",
      scrollbarPadding: false,
      backdrop: false,
    });
  }, []);

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
        {/* Title Dashboard */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Dashboard {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </h2>
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Admin Cards */}
          {user.role === "admin" && (
            <>
              {/* Card 1: User Information */}
              <div className="rounded-lg bg-white p-1 w-full shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  User Information
                </h3>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-700 text-sm">Name: {user.name}</p>
                  <p className="text-gray-700 text-sm">Email: {user.email}</p>
                </div>
              </div>
            </>
          )}
          {/* User Cards */}
          {user.role === "user" && (
            <>
              {/* Card 1: User Information */}
              <div className="rounded-lg bg-white p-1 w-full shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  User Information
                </h3>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-700 text-sm">Name: {user.name}</p>
                  <p className="text-gray-700 text-sm">Email: {user.email}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
