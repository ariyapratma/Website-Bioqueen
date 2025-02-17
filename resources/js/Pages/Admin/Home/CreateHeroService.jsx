import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const CreateHeroService = ({ auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    image_url: null,
    heading1: "",
    content1: "",
    heading2: "",
    content2: "",
    heading3: "",
    content3: "",
  });
  const [activeMenu, setActiveMenu] = useState("hero-service");
  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image_url", data.image_url);
    formData.append("heading1", data.heading1);
    formData.append("content1", data.content1);
    formData.append("heading2", data.heading2);
    formData.append("content2", data.content2);
    formData.append("heading3", data.heading3);
    formData.append("content3", data.content3);

    post("/hero-service", {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Service has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        }).then(() => {
          Inertia.visit("/hero-service");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Service.",
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
        <Head title="Create Hero Service | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/hero-service"
            className="hover:text-black hover:underline"
          >
            Manage Hero Service
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Create Hero Service</span>
        </nav>
        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Create Home Page Content
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
                required
              />
              <span className="ml-3 text-sm text-gray-500">
                {data.image_url ? data.image_url.name : "No file chosen"}
              </span>
            </div>
            {errors.image_url && (
              <span className="text-sm text-red-600">{errors.image_url}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="heading1"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Heading 1
            </label>
            <input
              id="heading1"
              type="text"
              value={data.heading1}
              onChange={(e) => setData("heading1", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
            {errors.heading1 && (
              <span className="text-sm text-red-600">{errors.heading1}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="content1"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Content 1
            </label>
            <textarea
              id="content1"
              value={data.content1}
              onChange={(e) => setData("content1", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
              required
            />
            {errors.content1 && (
              <span className="text-sm text-red-600">{errors.content1}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="heading2"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Heading 2
            </label>
            <input
              id="heading2"
              type="text"
              value={data.heading2}
              onChange={(e) => setData("heading2", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
            {errors.heading2 && (
              <span className="text-sm text-red-600">{errors.heading2}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="content2"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Content 2
            </label>
            <textarea
              id="content2"
              value={data.content2}
              onChange={(e) => setData("content2", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
              required
            />
            {errors.content2 && (
              <span className="text-sm text-red-600">{errors.content2}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="heading3"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Heading 3
            </label>
            <input
              id="heading3"
              type="text"
              value={data.heading3}
              onChange={(e) => setData("heading3", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
            {errors.heading3 && (
              <span className="text-sm text-red-600">{errors.heading3}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="content3"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Content 3
            </label>
            <textarea
              id="content3"
              value={data.content3}
              onChange={(e) => setData("content3", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
              required
            />
            {errors.content3 && (
              <span className="text-sm text-red-600">{errors.content3}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow px-6 py-2 font-lexend font-semibold text-black hover:bg-yellow-600 sm:w-auto"
          >
            {processing ? "Saving..." : "Save Hero Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHeroService;
