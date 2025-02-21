import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const ManageHeroOurGallery = ({ dataHeroOurGallery, auth }) => {
  const { delete: deleteRecord } = useForm();
  const [activeMenu, setActiveMenu] = useState("hero-our-gallery");
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
        deleteRecord(`/hero-our-gallery/${id}`, {
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
        <Head title="Manage Hero Our Gallery | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Manage Hero Our Gallery</span>
        </nav>
        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          AboutUs Page Content
        </h2>
        {/* Add Button */}
        <div className="mb-6 flex justify-end">
          <Link
            href="/hero-our-gallery/create"
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
                  Subtitle
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Image URL 1
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title Image URL 1
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Image URL 2
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title Image URL 2
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Image URL 3
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title Image URL 3
                </th>
                <th className="px-6 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {dataHeroOurGallery.map((heroOurGallery) => (
                <tr key={heroOurGallery.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroOurGallery.title}
                  </td>
                  <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroOurGallery.subtitle}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    <a
                      href={heroOurGallery.image_url1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Image
                    </a>
                  </td>
                  <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroOurGallery.title_image_url1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    <a
                      href={heroOurGallery.image_url2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Image
                    </a>
                  </td>
                  <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroOurGallery.title_image_url2}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    <a
                      href={heroOurGallery.image_url3}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Image
                    </a>
                  </td>
                  <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroOurGallery.title_image_url3}
                  </td>
                  <td className="flex flex-col items-center justify-center space-y-2 whitespace-nowrap px-6 py-4 font-lexend text-sm font-medium">
                    {/* Edit Button with Icon */}
                    <Link
                      href={`/hero-our-gallery/${heroOurGallery.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <IoPencil size={20} />
                    </Link>
                    {/* Delete Button with Icon */}
                    <button
                      onClick={() => handleDelete(heroOurGallery.id)}
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
          {dataHeroOurGallery.map((heroOurGallery) => (
            <div
              key={heroOurGallery.id}
              className="mb-4 rounded-lg bg-white p-4 shadow-md"
            >
              <div className="flex justify-between">
                <h3 className="font-lexend text-base font-bold text-gray-800">
                  {heroOurGallery.title}
                </h3>
                <div className="flex items-center space-x-2">
                  {/* Edit Button with Icon */}
                  <Link
                    href={`/hero-our-gallery/${heroOurGallery.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <IoPencil size={20} />
                  </Link>
                  {/* Delete Button with Icon */}
                  <button
                    onClick={() => handleDelete(heroOurGallery.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <IoTrash size={20} />
                  </button>
                </div>
              </div>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroOurGallery.subtitle}
              </p>
              <div className="mt-2 flex space-x-4">
                <a
                  href={heroOurGallery.image_url1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Image 1
                </a>
              </div>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroOurGallery.title_image_url1}
              </p>
              <div className="mt-2 flex space-x-4">
                <a
                  href={heroOurGallery.image_url2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Image 2
                </a>
              </div>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroOurGallery.title_image_url2}
              </p>
              <div className="mt-2 flex space-x-4">
                <a
                  href={heroOurGallery.image_url3}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Image 3
                </a>
              </div>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroOurGallery.title_image_url3}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageHeroOurGallery;
