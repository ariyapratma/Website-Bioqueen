// resources/js/Pages/ManageHeroWhyChoose.jsx

import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

const ManageHeroWhyChoose = ({ dataHeroWhyChoose }) => {
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
        deleteRecord(`/hero-why-choose/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Manage Hero Why Choose | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Manage Hero Why Choose</h1>

      <div className="mb-6">
        <Link
          href="/hero-why-choose/create"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add New Hero Why Choose
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
          {dataHeroWhyChoose.map((heroWhyChoose) => (
            <tr key={heroWhyChoose.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroWhyChoose.title}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroWhyChoose.subtitle}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroWhyChoose.heading1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroWhyChoose.content1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroWhyChoose.heading2}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroWhyChoose.content2}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroWhyChoose.image_url1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {heroWhyChoose.image_url2}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <Link
                  href={`/hero-why-choose/${heroWhyChoose.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(heroWhyChoose.id)}
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

export default ManageHeroWhyChoose;
