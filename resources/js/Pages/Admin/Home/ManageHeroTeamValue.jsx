// resources/js/Pages/ManageHeroTeamValue.jsx

import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

const ManageHeroTeamValue = ({ dataHeroTeamValue }) => {
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
        deleteRecord(`/hero-team-value/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Manage Hero Team Value | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Manage Hero Team Value</h1>

      <div className="mb-6">
        <Link
          href="/hero-team-value/create"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add New Hero Team Value
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
              Heading 1
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Content 1
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Heading 2
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Content 2
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image URL 1
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image URL 2
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {dataHeroTeamValue.map((heroTeamValue) => (
            <tr key={heroTeamValue.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroTeamValue.title}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroTeamValue.subtitle}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroTeamValue.heading1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroTeamValue.content1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroTeamValue.heading2}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroTeamValue.content2}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroTeamValue.image_url1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroTeamValue.image_url2}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <Link
                  href={`/hero-team-value/${heroTeamValue.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(heroTeamValue.id)}
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

export default ManageHeroTeamValue;
