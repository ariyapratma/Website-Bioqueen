import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const CreateHeroVideo = ({ auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    subtitle: "",
    youtube_link: "",
  });
  const [activeMenu, setActiveMenu] = useState("hero-video");
  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("youtube_link", data.youtube_link);

    post("/hero-video", {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Video has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        }).then(() => {
          Inertia.visit("/hero-video");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Video.",
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
        <Head title="Create Hero Video | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/hero-video" className="hover:text-black hover:underline">
            Manage Hero Video
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Create Hero Video</span>
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
              htmlFor="youtube_link"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              YouTube Link
            </label>
            <input
              id="youtube_link"
              type="text"
              value={data.youtube_link}
              onChange={(e) => setData("youtube_link", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
            {errors.youtube_link && (
              <span className="text-sm text-red-600">
                {errors.youtube_link}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow px-6 py-2 font-lexend font-semibold text-black hover:bg-yellow-600 sm:w-auto"
          >
            {processing ? "Saving..." : "Save Hero Video"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHeroVideo;
