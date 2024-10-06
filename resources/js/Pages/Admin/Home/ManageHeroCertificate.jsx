import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "@/Components/Admin/Sidebar";
import Searchbar from "@/Components/Admin/Searchbar";
import Notification from "@/Components/Admin/Notification";
import Dropdown from "@/Components/Dropdown";

const ManageHeroCertificate = ({ dataHeroCertificate, auth }) => {
  const { delete: deleteRecord } = useForm();
  const [activeMenu, setActiveMenu] = useState("hero-certificate");
  const user = auth.user;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(`/hero-certificate/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} />

      {/* Main Content */}
      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="Manage Hero Certificate | PT Ratu Bio Indonesia" />

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

        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Home Page Content
        </h2>

        {/* Table */}
        <div className="mb-6 flex justify-end">
          <Link
            href="/hero-certificate/create"
            className="rounded bg-custom-yellow px-4 py-2 font-lexend text-black hover:bg-yellow-500"
          >
            Add New Header
          </Link>
        </div>

        <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Title
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Subtitle
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Image URL 1
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Image URL 2
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Image URL 3
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Image URL 4
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Image URL 5
              </th>
              <th className="px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {dataHeroCertificate.map((heroCertificate) => (
              <tr key={heroCertificate.id}>
                <td className="max-w-xs truncate whitespace-nowrap px-6 py-4 font-lexend text-sm tracking-wider text-gray-700">
                  {heroCertificate.title}
                </td>
                <td className="w-1/6 px-6 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroCertificate.subtitle}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  <a
                    href={heroCertificate.image_url1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Image 1
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  <a
                    href={heroCertificate.image_url2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Image 2
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  <a
                    href={heroCertificate.image_url3}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Image 3
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  <a
                    href={heroCertificate.image_url4}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Image 4
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm text-gray-700">
                  <a
                    href={heroCertificate.image_url5}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Image 5
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-lexend text-sm font-medium">
                  <Link
                    href={`/hero-certificate/${heroCertificate.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(heroCertificate.id)}
                    className="ml-4 text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageHeroCertificate;
