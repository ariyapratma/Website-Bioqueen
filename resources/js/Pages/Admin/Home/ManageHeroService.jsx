import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const ManageHeroService = ({ dataHeroService, auth }) => {
  const { delete: deleteRecord } = useForm();
  const [activeMenu, setActiveMenu] = useState("hero-service");
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
        deleteRecord(`/hero-service/${id}`, {
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
        <Head title="Manage Hero Service | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />

        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Manage Hero Service</span>
        </nav>

        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Home Page Content
        </h2>

        {/* Add Button */}
        <div className="mb-6 flex justify-end">
          <Link
            href="/hero-service/create"
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
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Image URL
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Heading 1
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Content 1
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Heading 2
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Content 2
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Heading 3
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Content 3
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {dataHeroService.map((heroService) => (
                <tr key={heroService.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroService.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    <a
                      href={heroService.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Image
                    </a>
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroService.heading1}
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroService.content1}
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroService.heading2}
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroService.content2}
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroService.heading3}
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroService.content3}
                  </td>
                  <td className="flex flex-col items-center justify-center space-y-2 whitespace-nowrap px-6 py-4 font-lexend text-sm font-medium">
                    {/* Edit Button */}
                    <Link
                      href={`/hero-service/${heroService.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <IoPencil size={20} />
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(heroService.id)}
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
          {dataHeroService.map((heroService) => (
            <div
              key={heroService.id}
              className="mb-4 rounded-lg bg-white p-4 shadow-md"
            >
              <div className="flex justify-between">
                <h3 className="font-lexend text-base font-bold text-gray-800">
                  {heroService.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/hero-service/${heroService.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <IoPencil size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(heroService.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <IoTrash size={20} />
                  </button>
                </div>
              </div>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                <a
                  href={heroService.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Image
                </a>
              </p>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroService.heading1}
              </p>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroService.content1}
              </p>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroService.heading2}
              </p>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroService.content2}
              </p>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroService.heading3}
              </p>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroService.content3}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageHeroService;
