import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const ManageHeroExcellenceValue = ({ dataHeroExcellenceValue, auth }) => {
  const { delete: deleteRecord } = useForm();
  const [activeMenu, setActiveMenu] = useState("hero-excellence-value");
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
        deleteRecord(`/hero-excellence-value/${id}`, {
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
        <Head title="Manage Hero Excellence Value | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />

        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">
            Manage Hero Excellence Value
          </span>
        </nav>

        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Home Page Content
        </h2>

        {/* Add Button */}
        <div className="mb-6 flex justify-end">
          <Link
            href="/hero-excellence-value/create"
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
                  Heading
                </th>
                <th className="px-4 py-3 text-center font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {dataHeroExcellenceValue.map((heroExcellenceValue) => (
                <tr key={heroExcellenceValue.id}>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroExcellenceValue.title}
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {heroExcellenceValue.subtitle}
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {`${heroExcellenceValue.heading1} ${heroExcellenceValue.heading2} ${heroExcellenceValue.heading3} ${heroExcellenceValue.heading4}`}
                  </td>
                  <td className="max-w-[150px] truncate whitespace-nowrap px-4 py-4 text-center font-lexend text-sm text-gray-700">
                    {`${heroExcellenceValue.content1} ${heroExcellenceValue.content2} ${heroExcellenceValue.content3} ${heroExcellenceValue.content4}`}
                  </td>
                  <td className="flex flex-col items-center justify-center space-y-2 whitespace-nowrap px-6 py-4 font-lexend text-sm font-medium">
                    {/* Edit Button */}
                    <Link
                      href={`/hero-excellence-value/${heroExcellenceValue.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <IoPencil size={20} />
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(heroExcellenceValue.id)}
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
          {dataHeroExcellenceValue.map((heroExcellenceValue) => (
            <div
              key={heroExcellenceValue.id}
              className="mb-4 rounded-lg bg-white p-4 shadow-md"
            >
              <div className="flex justify-between">
                <h3 className="font-lexend text-base font-bold text-gray-800">
                  {heroExcellenceValue.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/hero-excellence-value/${heroExcellenceValue.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <IoPencil size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(heroExcellenceValue.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <IoTrash size={20} />
                  </button>
                </div>
              </div>
              <p className="mt-2 font-lexend text-sm text-gray-600">
                {heroExcellenceValue.subtitle}
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <p className="font-lexend text-sm text-gray-600">
                  <strong>Heading 1:</strong> {heroExcellenceValue.heading1}
                </p>
                <p className="font-lexend text-sm text-gray-600">
                  <strong>Content 1:</strong> {heroExcellenceValue.content1}
                </p>
                <p className="font-lexend text-sm text-gray-600">
                  <strong>Heading 2:</strong> {heroExcellenceValue.heading2}
                </p>
                <p className="font-lexend text-sm text-gray-600">
                  <strong>Content 2:</strong> {heroExcellenceValue.content2}
                </p>
                <p className="font-lexend text-sm text-gray-600">
                  <strong>Heading 3:</strong> {heroExcellenceValue.heading3}
                </p>
                <p className="font-lexend text-sm text-gray-600">
                  <strong>Content 3:</strong> {heroExcellenceValue.content3}
                </p>
                <p className="font-lexend text-sm text-gray-600">
                  <strong>Heading 4:</strong> {heroExcellenceValue.heading4}
                </p>
                <p className="font-lexend text-sm text-gray-600">
                  <strong>Content 4:</strong> {heroExcellenceValue.content4}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageHeroExcellenceValue;
