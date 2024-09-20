import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const EditHeroVideo = ({ dataHeroVideo }) => {
  // Initialize form with default values
  const { data, setData, put, processing, errors } = useForm({
    title: dataHeroVideo?.title || "",
    subtitle: dataHeroVideo?.subtitle || "",
    youtube_link: dataHeroVideo?.youtube_link || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("youtube_link", data.youtube_link);

    put(`/hero-video/${dataHeroVideo?.id}`, {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Video has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/hero-video";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the Hero Video.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Edit Hero Video | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Edit Hero Video</h1>
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

        {/* Subtitle Field */}
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

        {/* Youtube Link Field */}
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

        {/* Submit Button */}
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

export default EditHeroVideo;
