// resources/js/Pages/ManageHeroCertificate.jsx

import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

const ManageHeroCertificate = ({ dataHeroCertificate }) => {
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
        deleteRecord(`/hero-certificate/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Manage Hero Certificate | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Manage Hero Certificate</h1>

      <div className="mb-6">
        <Link
          href="/hero-certificate/create"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add New Hero Certificate
        </Link>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Subtitle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image URL 1
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image URL 2
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image URL 3
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image URL 4
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image URL 5
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {dataHeroCertificate.map((heroCertificate) => (
            <tr key={heroCertificate.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroCertificate.title}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroCertificate.subtitle}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroCertificate.image_url1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroCertificate.image_url2}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroCertificate.image_url3}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroCertificate.image_url4}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroCertificate.image_url5}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
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
  );
};

export default ManageHeroCertificate;
