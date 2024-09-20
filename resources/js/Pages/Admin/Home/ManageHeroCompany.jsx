// resources/js/Pages/ManageHeroCompany.jsx

import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

const ManageHeroCompany = ({ dataHeroCompany }) => {
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
        deleteRecord(`/hero-company/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Manage Hero Company | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Manage Hero Company</h1>

      <div className="mb-6">
        <Link
          href="/hero-company/create"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add New Company
        </Link>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Youtube Link
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {dataHeroCompany.map((companyHome) => (
            <tr key={companyHome.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {companyHome.image_url}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {companyHome.youtube_link}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {companyHome.title}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {companyHome.description}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <Link
                  href={`/hero-company/${companyHome.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(companyHome.id)}
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

export default ManageHeroCompany;
