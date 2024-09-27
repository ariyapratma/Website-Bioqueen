import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from "@/Components/Admin/Sidebar";
import Searchbar from "@/Components/Admin/Searchbar";
import Notification from "@/Components/Admin/Notification";
import Dropdown from "@/Components/Dropdown";

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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(`/hero-excellence-value/${id}`, {
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
        <Head title="Manage Hero Excellence Value | PT Ratu Bio Indonesia" />

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
                        src={
                          user?.avatar
                            ? `/storage/${user.avatar}`
                            : "/default-avatar.png"
                        }
                        className="mx-2 h-10 w-10 rounded-full border border-custom-yellow"
                      />
                      <svg
                        className="-me-0.5 ms-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
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
            href="/hero-excellence-value/create"
            className="rounded bg-custom-yellow px-4 py-2 font-lexend text-black hover:bg-yellow-500"
          >
            Add New Hero Excellence Value
          </Link>
        </div>

        <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
          <thead>
            <tr>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Title
              </th>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Subtitle
              </th>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Heading <br /> 1
              </th>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Content <br /> 1
              </th>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Heading <br /> 2
              </th>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Content <br /> 2
              </th>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Heading <br /> 3
              </th>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Content <br /> 3
              </th>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Heading <br /> 4
              </th>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Content <br /> 4
              </th>
              <th className="w-1/6 px-6 py-3 text-left font-lexend text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {dataHeroExcellenceValue.map((heroExcellenceValue) => (
              <tr key={heroExcellenceValue.id}>
                <td className="w-1/6 px-4 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroExcellenceValue.title}
                </td>
                <td className="w-1/6 px-4 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroExcellenceValue.subtitle}
                </td>
                <td className="w-1/6 px-4 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroExcellenceValue.heading1}
                </td>
                <td className="w-1/6 px-4 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroExcellenceValue.content1}
                </td>
                <td className="w-1/6 px-4 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroExcellenceValue.heading2}
                </td>
                <td className="w-1/6 px-4 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroExcellenceValue.content2}
                </td>
                <td className="w-1/6 px-4 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroExcellenceValue.heading3}
                </td>
                <td className="w-1/6 px-4 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroExcellenceValue.content3}
                </td>
                <td className="w-1/6 px-4 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroExcellenceValue.heading4}
                </td>
                <td className="w-1/6 px-4 py-3 font-lexend text-sm tracking-wider text-gray-700">
                  {heroExcellenceValue.content4}
                </td>
                <td className="whitespace-nowrap px-4 py-4 font-lexend text-sm font-medium">
                  <Link
                    href={`/hero-excellence-value/${heroExcellenceValue.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(heroExcellenceValue.id)}
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

export default ManageHeroExcellenceValue;
