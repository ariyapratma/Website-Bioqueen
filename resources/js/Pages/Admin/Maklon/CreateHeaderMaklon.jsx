// resources/js/Pages/CreateHeaderMaklon.jsx

import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const CreateHeaderMaklon = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    image_url: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/header-maklon", {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Header Maklon has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Optionally redirect or clear the form
          window.location.href = "/header-maklon";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Header Maklon.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Add Header Maklon | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Add New Header Maklon</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="image_url" className="block text-gray-700">
            Image Url
          </label>
          <input
            type="file"
            id="image_url"
            onChange={(e) => setData("image_url", e.target.files[0])}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.image_url && (
            <p className="mt-1 text-sm text-red-500">{errors.image_url}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={processing}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {processing ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default CreateHeaderMaklon;
