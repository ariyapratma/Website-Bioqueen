// resources/js/Pages/EditHeroFlyer.jsx

import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const EditHeroFlyer = ({ dataHeroFlyer }) => {
  // Initialize form with default values
  const { data, setData, put, processing, errors } = useForm({
    image_url: null, // Initialize as null for new image upload
    existing_image_url: dataHeroFlyer?.image_url || "", // Store the existing image URL
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (data.image_url) {
      // If a new image is uploaded, append it to formData
      formData.append("image_url", data.image_url);
    } else {
      // If no new image is uploaded, use the existing image URL
      formData.append("existing_image_url", data.existing_image_url);
    }

    put(`/hero-flyer/${dataHeroFlyer?.id}`, {
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Flyer has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/hero-flyer"; // Redirect after success
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the Hero Flyer.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Edit Hero Flyer | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Edit Hero Flyer</h1>
      <form onSubmit={handleSubmit}>
        {/* Image URL Field */}
        <div className="mb-4">
          <label htmlFor="image_url" className="block text-gray-700">
            Image Upload
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

        {/* Preview Existing Image */}
        <div className="mb-4">
          <p className="text-gray-700">
            Existing Image URL: {dataHeroFlyer?.image_url}
          </p>
          {/* {dataHeroFlyer?.image_url && (
            <img
              src={`/storage/app/public/hero_flyer/${dataHeroFlyer.image_url}`}
              alt="Current Hero Flyer"
              className="mt-2 h-auto w-full"
            />
          )} */}
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

export default EditHeroFlyer;
