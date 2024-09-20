import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const EditHeroCertificate = ({ dataHeroCertificate }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: dataHeroCertificate?.title || "",
    subtitle: dataHeroCertificate?.subtitle || "",
    image_url1: null,
    image_url2: null,
    image_url3: null,
    image_url4: null,
    image_url5: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/hero-certificate/${dataHeroCertificate.id}`, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Certificate has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/hero-certificate";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the Hero Certificate.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Edit Hero Certificate | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Edit Hero Certificate</h1>
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
        <div className="mb-4">
          <label htmlFor="image_url3" className="block text-gray-700">
            Image 3
          </label>
          <input
            type="file"
            id="image_url3"
            onChange={(e) => setData("image_url3", e.target.files[0])}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.image_url3 && (
            <p className="mt-1 text-sm text-red-500">{errors.image_url3}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="image_url4" className="block text-gray-700">
            Image 4
          </label>
          <input
            type="file"
            id="image_url4"
            onChange={(e) => setData("image_url4", e.target.files[0])}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.image_url4 && (
            <p className="mt-1 text-sm text-red-500">{errors.image_url4}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="image_url5" className="block text-gray-700">
            Image 5
          </label>
          <input
            type="file"
            id="image_url5"
            onChange={(e) => setData("image_url5", e.target.files[0])}
            className="mt-1 block w-full rounded border border-gray-300"
          />
          {errors.image_url5 && (
            <p className="mt-1 text-sm text-red-500">{errors.image_url5}</p>
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

export default EditHeroCertificate;
