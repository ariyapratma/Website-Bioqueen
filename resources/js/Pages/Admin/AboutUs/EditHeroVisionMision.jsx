import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const EditHeroVisionMision = ({ dataHeroVisionMision, auth }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: dataHeroVisionMision.title || "",
    subtitle: dataHeroVisionMision.subtitle || "",
    description1: dataHeroVisionMision.description1 || "",
    description2: dataHeroVisionMision.description2 || "",
    description3: dataHeroVisionMision.description3 || "",
    description4: dataHeroVisionMision.description4 || "",
    description5: dataHeroVisionMision.description5 || "",
    description6: dataHeroVisionMision.description6 || "",
    image_url: null,
  });

  const [activeMenu, setActiveMenu] = useState("hero-vision-mision");

  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Using FormData to handle file upload
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("description1", data.description1);
    formData.append("description2", data.description2);
    formData.append("description3", data.description3);
    formData.append("description4", data.description4);
    formData.append("description5", data.description5);
    formData.append("description6", data.description6);
    formData.append("image_url", data.image_url);

    put(`/hero-vision-mision/${dataHeroVisionMision.id}`, {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Vision Mision has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        }).then(() => {
          Inertia.visit("/hero-vision-mision");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the Hero Vision Mision.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {auth && (
        <Sidebar
          auth={auth}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      )}
      {/* Main Content */}
      <div className="mt-16 flex-1 bg-neutral-50 p-6">
        <Head title="Edit Hero Vision Mision | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/hero-vision-mision"
            className="hover:text-black hover:underline"
          >
            Manage Hero Vision Mision
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Edit Hero Vision Mision</span>
        </nav>
        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Edit AboutUs Page Content
        </h2>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-screen-lg space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="title"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
            {errors.title && (
              <span className="text-sm text-red-600">{errors.title}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="subtitle"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Subtitle
            </label>
            <textarea
              id="subtitle"
              value={data.subtitle}
              onChange={(e) => setData("subtitle", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
              required
            />
            {errors.subtitle && (
              <span className="text-sm text-red-600">{errors.subtitle}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="description1"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Description 1
            </label>
            <textarea
              id="description1"
              value={data.description1}
              onChange={(e) => setData("description1", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
              required
            />
            {errors.description1 && (
              <span className="text-sm text-red-600">
                {errors.description1}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="description2"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Description 2
            </label>
            <textarea
              id="description2"
              value={data.description2}
              onChange={(e) => setData("description2", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
              required
            />
            {errors.description2 && (
              <span className="text-sm text-red-600">
                {errors.description2}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="description3"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Description 3
            </label>
            <textarea
              id="description3"
              value={data.description3}
              onChange={(e) => setData("description3", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
              required
            />
            {errors.description3 && (
              <span className="text-sm text-red-600">
                {errors.description3}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="description4"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Description 4
            </label>
            <textarea
              id="description4"
              value={data.description4}
              onChange={(e) => setData("description4", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
              required
            />
            {errors.description4 && (
              <span className="text-sm text-red-600">
                {errors.description4}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="description5"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Description 5
            </label>
            <textarea
              id="description5"
              value={data.description5}
              onChange={(e) => setData("description5", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
              required
            />
            {errors.description5 && (
              <span className="text-sm text-red-600">
                {errors.description5}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="description6"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Description 6
            </label>
            <textarea
              id="description6"
              value={data.description6}
              onChange={(e) => setData("description6", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
              required
            />
            {errors.description6 && (
              <span className="text-sm text-red-600">
                {errors.description6}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="image_url"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-md bg-custom-yellow px-4 py-2 font-lexend text-black hover:bg-yellow-600"
              >
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={(e) => setData("image_url", e.target.files[0])}
                className="hidden"
              />
              <span className="ml-3 text-sm text-gray-500">
                {data.image_url ? data.image_url.name : "No file chosen"}
              </span>
            </div>
            {errors.image_url && (
              <span className="text-sm text-red-600">{errors.image_url}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow px-6 py-2 font-lexend font-semibold text-black hover:bg-yellow-600 sm:w-auto"
          >
            {processing ? "Saving..." : "Update Hero Vision Mision"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHeroVisionMision;