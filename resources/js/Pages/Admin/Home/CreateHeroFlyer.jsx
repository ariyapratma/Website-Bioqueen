// resources/js/Pages/CreateHeroFlyer.jsx

import React from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const CreateHeroFlyer = () => {
  const { setData, post, processing, errors } = useForm({
    image_url: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/hero-flyer", {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Flyer has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Optionally redirect or clear the form
          window.location.href = "/hero-flyer";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Fluer.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Add Hero Flyer | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Add New Flyer Home</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

export default CreateHeroFlyer;
