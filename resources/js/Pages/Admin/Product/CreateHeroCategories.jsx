import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const CreateHeroCategories = ({ auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    slug: "",
    image_url: null,
    name: "",
    description_categories: "",
  });

  const [activeMenu, setActiveMenu] = useState("hero-categories");

  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("slug", data.slug);
    formData.append("image_url", data.image_url);
    formData.append("name", data.name);
    formData.append("description_categories", data.description_categories);

    post("/hero-categories", {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Categories has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        }).then(() => {
          Inertia.visit("/hero-categories");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Categories.",
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
        <Head title="Create Hero Categories | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/hero-categories"
            className="hover:text-black hover:underline"
          >
            Manage Hero Categories
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Create Hero Categories</span>
        </nav>
        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Create Product Page Content
        </h2>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-screen-lg space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="slug"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Slug
            </label>
            <input
              id="slug"
              type="text"
              value={data.slug}
              onChange={(e) => setData("slug", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
            {errors.slug && (
              <span className="text-sm text-red-600">{errors.slug}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              required
            />
            {errors.name && (
              <span className="text-sm text-red-600">{errors.name}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="description_categories"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Description Categories
            </label>
            <textarea
              id="description_categories"
              value={data.description_categories}
              onChange={(e) =>
                setData("description_categories", e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              rows="4"
            />
            {errors.description_categories && (
              <span className="text-sm text-red-600">
                {errors.description_categories}
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
          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow px-6 py-2 font-lexend font-semibold text-black hover:bg-yellow-600 sm:w-auto"
          >
            {processing ? "Saving..." : "Save Hero Categories"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHeroCategories;
