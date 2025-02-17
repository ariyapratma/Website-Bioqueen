import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const CreateHeroCertificate = ({ auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    subtitle: "",
    image_url1: null,
    image_url2: null,
    image_url3: null,
    image_url4: null,
    image_url5: null,
  });
  const [activeMenu, setActiveMenu] = useState("hero-certificate");
  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("image_url1", data.image_url1);
    formData.append("image_url2", data.image_url2);
    formData.append("image_url3", data.image_url3);
    formData.append("image_url4", data.image_url4);
    formData.append("image_url5", data.image_url5);

    post("/hero-certificate", {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Certificate has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        }).then(() => {
          Inertia.visit("/hero-certificate");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Certificate.",
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
        <Head title="Create Hero Certificate | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/hero-certificate"
            className="hover:text-black hover:underline"
          >
            Manage Hero Certificate
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Create Hero Certificate</span>
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
          <div>
            <label
              htmlFor="image_url3"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Image 3
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file-upload3"
                className="cursor-pointer rounded-md bg-custom-yellow px-4 py-2 font-lexend text-black hover:bg-yellow-600"
              >
                Choose File
              </label>
              <input
                id="file-upload3"
                type="file"
                onChange={(e) => setData("image_url3", e.target.files[0])}
                className="hidden"
                required
              />
              <span className="ml-3 text-sm text-gray-500">
                {data.image_url3 ? data.image_url3.name : "No file chosen"}
              </span>
            </div>
            {errors.image_url3 && (
              <span className="text-sm text-red-600">{errors.image_url3}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="image_url4"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Image 4
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file-upload4"
                className="cursor-pointer rounded-md bg-custom-yellow px-4 py-2 font-lexend text-black hover:bg-yellow-600"
              >
                Choose File
              </label>
              <input
                id="file-upload4"
                type="file"
                onChange={(e) => setData("image_url4", e.target.files[0])}
                className="hidden"
                required
              />
              <span className="ml-3 text-sm text-gray-500">
                {data.image_url4 ? data.image_url4.name : "No file chosen"}
              </span>
            </div>
            {errors.image_url4 && (
              <span className="text-sm text-red-600">{errors.image_url4}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="image_url5"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Image 5
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file-upload5"
                className="cursor-pointer rounded-md bg-custom-yellow px-4 py-2 font-lexend text-black hover:bg-yellow-600"
              >
                Choose File
              </label>
              <input
                id="file-upload5"
                type="file"
                onChange={(e) => setData("image_url5", e.target.files[0])}
                className="hidden"
                required
              />
              <span className="ml-3 text-sm text-gray-500">
                {data.image_url5 ? data.image_url5.name : "No file chosen"}
              </span>
            </div>
            {errors.image_url5 && (
              <span className="text-sm text-red-600">{errors.image_url5}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow px-6 py-2 font-lexend font-semibold text-black hover:bg-yellow-600 sm:w-auto"
          >
            {processing ? "Saving..." : "Save Hero Certificate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHeroCertificate;
