// resources/js/Pages/CreateHeroVideo.jsx

import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const CreateHeroVideo = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    subtitle: "",
    youtube_link: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/hero-video", {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Video has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Optionally redirect or clear the form
          window.location.href = "/hero-video";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Video.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Add Hero Video | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Add New Hero Video</h1>
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
          <label htmlFor="subtitle" className="block text-gray-700">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            value={data.subtitle}
            onChange={(e) => setData("subtitle", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.subtitle && (
            <p className="mt-1 text-sm text-red-500">{errors.subtitle}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="youtube_link" className="block text-gray-700">
            Youtube Link
          </label>
          <input
            type="text"
            id="youtube_link"
            value={data.youtube_link}
            onChange={(e) => setData("youtube_link", e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.youtube_link && (
            <p className="mt-1 text-sm text-red-500">{errors.youtube_link}</p>
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

export default CreateHeroVideo;
