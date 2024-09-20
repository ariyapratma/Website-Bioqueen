import React from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const EditHeroFacilitiesValue = ({ dataHeroFacilitiesValue }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: dataHeroFacilitiesValue?.title || "",
    heading1: dataHeroFacilitiesValue?.heading1 || "",
    content1: dataHeroFacilitiesValue?.content1 || "",
    image_url1: null,
    heading2: dataHeroFacilitiesValue?.heading2 || "",
    content2: dataHeroFacilitiesValue?.content2 || "",
    image_url2: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/hero-facilities-value/${dataHeroFacilitiesValue.id}`, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Facilities Value has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/hero-facilities-value";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the Hero Facilities Value.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Edit Hero Facilities Value | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Edit Hero Facilities Value</h1>
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

        {/* Heading 1 */}
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

        {/* Content 1 */}
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

        {/* Image 1 */}
        <div className="mb-4">
          <label htmlFor="image_url1" className="block text-gray-700">
            Image 1
          </label>
          <input
            type="file"
            id="image_url1"
            onChange={(e) => setData("image_url1", e.target.files[0])}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.image_url1 && (
            <p className="mt-1 text-sm text-red-500">{errors.image_url1}</p>
          )}
        </div>

        {/* Heading 2 */}
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

        {/* Content 2 */}
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

        {/* Image 2 */}
        <div className="mb-4">
          <label htmlFor="image_url2" className="block text-gray-700">
            Image 2
          </label>
          <input
            type="file"
            id="image_url2"
            onChange={(e) => setData("image_url2", e.target.files[0])}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.image_url2 && (
            <p className="mt-1 text-sm text-red-500">{errors.image_url2}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {processing ? "Saving..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditHeroFacilitiesValue;
