import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "@/Components/Admin/Sidebar";
import Searchbar from "@/Components/Admin/Searchbar";
import Notification from "@/Components/Admin/Notification";
import Dropdown from "@/Components/Dropdown";
import Swal from "sweetalert2";

export default function Dashboard({ auth }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = auth.user;

  // SweetAlert on load
  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: `Selamat Datang, ${user?.name}!`,
      text: `Anda login sebagai ${user?.role}.`,
      confirmButtonText: "OK",
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <Sidebar activeMenu={activeMenu} /> */}
      <Sidebar
        auth={auth}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Main Content */}
      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="Dashboard | PT Ratu Bio Indonesia" />

        {/* Header */}
        <div className="mb-4 flex w-full items-center justify-between">
          {/* Back Button on the Left */}
          <Link
            href="/dashboard"
            className="rounded bg-custom-yellow px-4 py-2 text-black hover:bg-yellow-500"
          >
            <IoChevronBackOutline className="h-4 w-4" />
          </Link>

          {/* Search Bar */}
          <Searchbar />

          {/* Admin Notification and Avatar */}
          <div className="flex items-center">
            <Notification />
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
              {/* Card 1: Informasi Pengguna */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  Informasi Pengguna
                </h3>
                <div className="mt-4">
                  <p>Nama: {user.name}</p>
                  <p>Email: {user.email}</p>
                </div>
              </div>

              {/* Card 2: Riwayat Pesanan */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  Riwayat Pesanan
                </h3>
                <div className="mt-4">
                  <p>Jumlah Pesanan: 3</p>
                  {/* Tempatkan grafik atau informasi lain */}
                </div>
              </div>
              {/* Card 3: Riwayat Komentar */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="font-lexend text-lg font-semibold">
                  Riwayat Komentar
                </h3>
                <div className="mt-4">
                  <p>Jumlah Komentar: 13</p>
                  {/* Tempatkan grafik atau informasi lain */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
