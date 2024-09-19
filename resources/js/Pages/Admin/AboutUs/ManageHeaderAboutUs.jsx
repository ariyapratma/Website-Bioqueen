// resources/js/Pages/ManageHeaderAboutUs.jsx

import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

const ManageHeaderAboutUs = ({ dataHeaderAboutUs }) => {
  const { delete: deleteRecord } = useForm();

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
        deleteRecord(`/header-about-us/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Manage Header About Us | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Manage Header About Us</h1>

      <div className="mb-6">
        <Link
          href="/header-about-us/create"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add New Header
        </Link>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {dataHeaderAboutUs.map((headerAboutUs) => (
            <tr key={headerAboutUs.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {headerAboutUs.title}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {headerAboutUs.description}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {headerAboutUs.image_url}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <Link
                  href={`/header-about-us/${headerAboutUs.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(headerAboutUs.id)}
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
  );
};

export default ManageHeaderAboutUs;
