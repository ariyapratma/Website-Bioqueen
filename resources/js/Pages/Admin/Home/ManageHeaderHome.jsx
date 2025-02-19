import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const ManageHeaderHome = ({ dataHeaderHome, auth }) => {
  const { delete: deleteRecord } = useForm();
  const [activeMenu, setActiveMenu] = useState("header-home");
  const user = auth.user;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#000000",
      scrollbarPadding: false,
      backdrop: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(`/header-home/${id}`, {
          method: "DELETE",
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        });
      }
    });
  };

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
        <Head title="Manage Header Home | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />

        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Manage Header Home</span>
        </nav>

        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Home Page Content
        </h2>

        {/* Add Button */}
        <div className="mb-6 flex justify-end">
          <Link
            href="/header-home/create"
            className="rounded bg-custom-yellow p-2 text-black hover:bg-yellow-500"
          >
            <IoAdd size={24} />
          </Link>
        </div>

        {/* Table for Desktop */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Description
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Image URL
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  WhatsApp Link
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {dataHeaderHome.map((headerHome) => (
                <tr key={headerHome.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    {headerHome.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    {headerHome.description}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    <a
                      href={headerHome.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Image
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    <a
                      href={headerHome.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </td>
                  <td className="flex flex-col items-center justify-center space-y-2 whitespace-nowrap px-6 py-4 font-lexend text-sm font-medium">
                    {/* Edit Button */}
                    <Link
                      href={`/header-home/${headerHome.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <IoPencil size={20} />
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(headerHome.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <IoTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden">
          {dataHeaderHome.map((headerHome) => (
            <div
              key={headerHome.id}
              className="mb-4 rounded-lg bg-white p-4 shadow-md"
            >
              <div className="flex justify-between">
                <h3 className="font-lexend text-base font-bold text-gray-800">
                  {headerHome.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/header-home/${headerHome.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <IoPencil size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(headerHome.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <IoTrash size={20} />
                  </button>
                </div>
              </div>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {headerHome.description}
              </p>
              <div className="mt-2 flex space-x-4">
                <a
                  href={headerHome.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Image
                </a>
                <a
                  href={headerHome.whatsapp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageHeaderHome;
