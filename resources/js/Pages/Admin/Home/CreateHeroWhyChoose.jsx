import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";

const CreateHeroWhyChoose = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    subtitle: "",
    heading1: "",
    content1: "",
    heading2: "",
    content2: "",
    image_url1: null,
    image_url2: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/hero-why-choose", {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Why Choose has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/hero-why-choose";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Why Choose.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="bg-white p-6">
      <Head title="Add Hero Why Choose | PT Ratu Bio Indonesia" />
      <h1 className="mb-6 text-2xl font-bold">Add New Hero Why Choose</h1>
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

export default CreateHeroWhyChoose;
