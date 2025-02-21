import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const ManageHeroVisionMision = ({ dataHeroVisionMision, auth }) => {
  const { delete: deleteRecord } = useForm();
  const [activeMenu, setActiveMenu] = useState("hero-vision-mision");
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
        deleteRecord(`/hero-vision-mision/${id}`, {
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
        <Head title="Manage Hero Vision Mision | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">
            Manage Hero Vision Mision
          </span>
        </nav>
        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          AboutUs Page Content
        </h2>
        {/* Add Button */}
        <div className="mb-6 flex justify-end">
          <Link
            href="/hero-vision-mision/create"
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
                  Subtitle
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Description
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Image URL
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {dataHeroVisionMision.map((heroVisionMision) => (
                <tr key={heroVisionMision.id}>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroVisionMision.title}
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroVisionMision.subtitle}
                  </td>
                  <td className="max-w-[200px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {`${heroVisionMision.description1} ${heroVisionMision.description2} ${heroVisionMision.description3} ${heroVisionMision.description4} ${heroVisionMision.description5} ${heroVisionMision.description6}`}
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    <a
                      href={heroVisionMision.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Image
                    </a>
                  </td>
                  <td className="flex flex-col items-center justify-center space-y-2 whitespace-nowrap px-4 py-4 font-lexend text-sm font-medium">
                    {/* Edit Button with Icon */}
                    <Link
                      href={`/hero-vision-mision/${heroVisionMision.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <IoPencil size={20} />
                    </Link>
                    {/* Delete Button with Icon */}
                    <button
                      onClick={() => handleDelete(heroVisionMision.id)}
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
          {dataHeroVisionMision.map((heroVisionMision) => (
            <div
              key={heroVisionMision.id}
              className="mb-4 rounded-lg bg-white p-4 shadow-md"
            >
              <div className="flex justify-between">
                <h3 className="font-lexend text-base font-bold text-gray-800">
                  {heroVisionMision.title}
                </h3>
                <div className="flex items-center space-x-2">
                  {/* Edit Button with Icon */}
                  <Link
                    href={`/hero-vision-mision/${heroVisionMision.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <IoPencil size={20} />
                  </Link>
                  {/* Delete Button with Icon */}
                  <button
                    onClick={() => handleDelete(heroVisionMision.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <IoTrash size={20} />
                  </button>
                </div>
              </div>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroVisionMision.subtitle}
              </p>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {`${heroVisionMision.description1} ${heroVisionMision.description2} ${heroVisionMision.description3} ${heroVisionMision.description4} ${heroVisionMision.description5} ${heroVisionMision.description6}`}
              </p>
              <div className="mt-2 flex space-x-4">
                <a
                  href={heroVisionMision.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Image
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageHeroVisionMision;
