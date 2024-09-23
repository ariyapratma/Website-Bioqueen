import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from "@/Components/Admin/Sidebar";
import Notification from "@/Components/Admin/Notification";
import Avatar from "@/Components/Admin/Avatar";

const CreateHeaderHome = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    image_url: null,
    whatsapp_link: "",
  });

  const [activeMenu, setActiveMenu] = useState("header-home");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Using FormData to handle file upload
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image_url", data.image_url); // Add the file
    formData.append("whatsapp_link", data.whatsapp_link);

    post("/header-home", {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Header Home has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/header-home";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Header Home.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} />

      {/* Main Content */}
      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="Create Header Home | PT Ratu Bio Indonesia" />

        {/* Header */}
        <div className="mb-4 flex w-full items-center justify-between">
          <Link
            href="/header-home"
            className="rounded bg-custom-yellow px-4 py-2 text-black hover:bg-yellow-500"
          >
            <IoChevronBackOutline className="h-4 w-4" />
          </Link>

          {/* Admin Logo and Notification */}
          <div className="flex items-center">
            {/* Notification */}
            <Notification />
            {/* Avatar */}
            <Avatar />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Create Home Page Content
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.title && (
              <span className="text-sm text-red-600">{errors.title}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="4"
              required
            />
            {errors.description && (
              <span className="text-sm text-red-600">{errors.description}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="image_url"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              id="image_url"
              type="file" // Change type to file
              onChange={(e) => setData("image_url", e.target.files[0])} // Handle file input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.image_url && (
              <span className="text-sm text-red-600">{errors.image_url}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="whatsapp_link"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              WhatsApp Link
            </label>
            <input
              id="whatsapp_link"
              type="text"
              value={data.whatsapp_link}
              onChange={(e) => setData("whatsapp_link", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.whatsapp_link && (
              <span className="text-sm text-red-600">
                {errors.whatsapp_link}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow py-2 font-lexend font-semibold text-black hover:bg-yellow-600"
          >
            {processing ? "Saving..." : "Save Header Home"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHeaderHome;
