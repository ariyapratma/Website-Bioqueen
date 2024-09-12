// resources/js/Pages/EditHeaderHome.jsx

import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const EditHeaderHome = ({ dataHeaderHome }) => {
  // Initialize form with default values
  const { data, setData, put, processing, errors } = useForm({
    title: dataHeaderHome?.title || "",
    description: dataHeaderHome?.description || "",
    image_url: null, // Initialize as null
    whatsapp_link: dataHeaderHome?.whatsapp_link || "",
  });

  // Handle form submission
  // Remove manual validation for title (if not required)
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title); // Allow title to be empty
    formData.append("description", data.description);

    // Append existing image URL if no new image is selected
    if (!data.image_url) {
      formData.append("existing_image_url", dataHeaderHome?.image_url || "");
    } else {
      formData.append("image_url", data.image_url);
    }
    formData.append("whatsapp_link", data.whatsapp_link);

    put(`/header-home/${dataHeaderHome?.id}`, {
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Header Home has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/header-home"; // Redirect after success
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the Header Home.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Edit Header Home | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Edit Header Home</h1>
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
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

        {/* Description Field */}
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

        {/* Image URL Field */}
        <div className="mb-4">
          <label htmlFor="image_url" className="block text-gray-700">
            Image URL
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

        {/* WhatsApp Link Field */}
        <div className="mb-4">
          <label htmlFor="whatsapp_link" className="block text-gray-700">
            WhatsApp Link
          </label>
          <input
            type="text"
            id="whatsapp_link"
            value={data.whatsapp_link}
            onChange={(e) => setData("whatsapp_link", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.whatsapp_link && (
            <p className="mt-1 text-sm text-red-500">{errors.whatsapp_link}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {processing ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditHeaderHome;
