// resources/js/Pages/CreateHeroService.jsx

import React from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const CreateHeroService = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    image_url: "",
    heading1: "",
    content1: "",
    heading2: "",
    content2: "",
    heading3: "",
    content3: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/hero-service", {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Service has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Optionally redirect or clear the form
          window.location.href = "/hero-service";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Service.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Add Hero Service | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Add New Hero Service</h1>
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
        <div className="mb-4">
          <label htmlFor="heading1" className="block text-gray-700">
            Heading 1
          </label>
          <input
            type="text"
            id="heading1"
            value={data.heading1}
            onChange={(e) => setData("heading1", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.heading1 && (
            <p className="mt-1 text-sm text-red-500">{errors.heading1}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="content1" className="block text-gray-700">
            Content 1
          </label>
          <textarea
            id="content1"
            value={data.content1}
            onChange={(e) => setData("content1", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.content1 && (
            <p className="mt-1 text-sm text-red-500">{errors.content1}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="heading2" className="block text-gray-700">
            Heading 2
          </label>
          <input
            type="text"
            id="heading2"
            value={data.heading2}
            onChange={(e) => setData("heading2", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.heading2 && (
            <p className="mt-1 text-sm text-red-500">{errors.heading2}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="content2" className="block text-gray-700">
            Content 2
          </label>
          <textarea
            id="content2"
            value={data.content2}
            onChange={(e) => setData("content2", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.content2 && (
            <p className="mt-1 text-sm text-red-500">{errors.content2}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="heading3" className="block text-gray-700">
            Heading 3
          </label>
          <input
            type="text"
            id="heading3"
            value={data.heading3}
            onChange={(e) => setData("heading3", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.heading3 && (
            <p className="mt-1 text-sm text-red-500">{errors.heading3}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="content3" className="block text-gray-700">
            Content 3
          </label>
          <textarea
            id="content3"
            value={data.content3}
            onChange={(e) => setData("content3", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.content3 && (
            <p className="mt-1 text-sm text-red-500">{errors.content3}</p>
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

export default CreateHeroService;
