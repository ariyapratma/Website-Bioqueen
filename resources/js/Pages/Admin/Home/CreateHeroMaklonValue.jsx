import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const CreateHeroMaklonValue = ({ auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    heading1: "",
    content1: "",
    image_url1: null,
    heading2: "",
    content2: "",
    image_url2: null,
  });
  const [activeMenu, setActiveMenu] = useState("hero-maklon-value");
  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("heading1", data.heading1);
    formData.append("content1", data.content1);
    formData.append("image_url1", data.image_url1);
    formData.append("heading2", data.heading2);
    formData.append("content2", data.content2);
    formData.append("image_url2", data.image_url2);

    post("/hero-maklon-value", {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Maklon Value has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        }).then(() => {
          Inertia.visit("/hero-maklon-value");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Maklon Value.",
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
        <Head title="Create Hero Maklon Value | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/hero-maklon-value"
            className="hover:text-black hover:underline"
          >
            Manage Hero Maklon Value
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Create Hero Maklon Value</span>
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
              htmlFor="image_url1"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Image 1
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file-upload1"
                className="cursor-pointer rounded-md bg-custom-yellow px-4 py-2 font-lexend text-black hover:bg-yellow-600"
              >
                Choose File
              </label>
              <input
                id="file-upload1"
                type="file"
                onChange={(e) => setData("image_url1", e.target.files[0])}
                className="hidden"
                required
              />
              <span className="ml-3 text-sm text-gray-500">
                {data.image_url1 ? data.image_url1.name : "No file chosen"}
              </span>
            </div>
            {errors.image_url1 && (
              <span className="text-sm text-red-600">{errors.image_url1}</span>
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
              htmlFor="image_url2"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Image 2
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file-upload2"
                className="cursor-pointer rounded-md bg-custom-yellow px-4 py-2 font-lexend text-black hover:bg-yellow-600"
              >
                Choose File
              </label>
              <input
                id="file-upload2"
                type="file"
                onChange={(e) => setData("image_url2", e.target.files[0])}
                className="hidden"
                required
              />
              <span className="ml-3 text-sm text-gray-500">
                {data.image_url2 ? data.image_url2.name : "No file chosen"}
              </span>
            </div>
            {errors.image_url2 && (
              <span className="text-sm text-red-600">{errors.image_url2}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow px-6 py-2 font-lexend font-semibold text-black hover:bg-yellow-600 sm:w-auto"
          >
            {processing ? "Saving..." : "Save Hero Maklon Value"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHeroMaklonValue;
