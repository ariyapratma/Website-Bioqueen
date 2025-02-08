import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from "@/Components/Admin/Sidebar";
import Swal from "sweetalert2";
import Navbar from "@/Components/Navbar/Navbar";

export default function Dashboard({ orders = [], dataHeroReview = [], auth }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = auth.user;

  // SweetAlert on load
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
      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="Dashboard | PT Ratu Bio Indonesia" />
         <Navbar auth={auth} />

        {/* Header */}
        <div className="mb-4 mt-16 flex w-full items-center justify-between">
          {/* Back Button on the Left */}
          <Link
            href="/dashboard"
            className="rounded bg-custom-yellow px-4 py-2 text-black hover:bg-yellow-500"
          >
            <IoChevronBackOutline className="h-4 w-4" />
          </Link>
        </div>

        {/* Title Dashboard */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Dashboard {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </h2>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Admin Cards */}
          {user.role === "admin" && (
            <>
              {/* Card 1: Ringkasan Penjualan */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  Ringkasan Penjualan
                </h3>
                <div className="mt-4">
                  {/* Tempatkan grafik atau informasi ringkasan */}
                  <p>Total Penjualan: 1000</p>
                </div>
              </div>

              {/* Card 2: Ringkasan Pesanan */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  Ringkasan Pesanan
                </h3>
                <div className="mt-4">
                  {/* Tempatkan grafik atau informasi ringkasan */}
                  <p>Total Pesanan: 150</p>
                </div>
              </div>

              {/* Card 3: Jumlah Pengguna */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  Jumlah Pengguna
                </h3>
                <div className="mt-4">
                  {/* Tempatkan grafik atau informasi ringkasan */}
                  <p>Total Pengguna: 500</p>
                </div>
              </div>
            </>
          )}

          {/* User Cards */}
          {user.role === "user" && (
            <>
              {/* Card 1: User Information */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  User Information
                </h3>
                <div className="mt-4">
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                </div>
              </div>

              {/* Card 2: Order History */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  Order History
                </h3>
                <div className="mt-4">
                  {orders.length === 0 ? (
                    <p className="text-red-500">
                      There is no order history yet.
                    </p>
                  ) : (
                    <p>Jumlah Pesanan: {orders.length}</p>
                  )}
                </div>
              </div>

              {/* Card 3: Comment History */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  Comment History
                </h3>
                <div className="mt-4">
                  {dataHeroReview.length === 0 ? (
                    <p className="text-red-500">No comment yet.</p>
                  ) : (
                    <p>Total Comments: {dataHeroReview.length}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
