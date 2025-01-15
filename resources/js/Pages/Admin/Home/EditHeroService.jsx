import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "@/Components/Admin/Sidebar";
import Dropdown from "@/Components/Dropdown";

const EditHeroService = ({ dataHeroService, auth }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: dataHeroService?.title || "",
    image_url: null,
    heading1: dataHeroService?.heading1 || "",
    content1: dataHeroService?.content1 || "",
    heading2: dataHeroService?.heading2 || "",
    content2: dataHeroService?.content2 || "",
    heading3: dataHeroService?.heading3 || "",
    content3: dataHeroService?.content3 || "",
  });

  const [activeMenu, setActiveMenu] = useState("hero-service");

  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Using FormData to handle file upload
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image_url", data.image_url);
    formData.append("heading1", data.heading1);
    formData.append("content1", data.content1);
    formData.append("heading2", data.heading2);
    formData.append("content2", data.content2);
    formData.append("heading3", data.heading3);
    formData.append("content3", data.content3);

    put(`/hero-service/${dataHeroService.id}`, {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Service has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          Inertia.visit("/hero-service");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the Hero Service.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {auth && (
        <Sidebar
          auth={auth}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      )}

      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="Edit Hero Service | PT Ratu Bio Indonesia" />

        <div className="mb-4 flex w-full items-center justify-between">
          <Link
            href="/hero-service"
            className="rounded bg-custom-yellow px-4 py-2 text-black hover:bg-yellow-500"
          >
            <IoChevronBackOutline className="h-4 w-4" />
          </Link>

          {/* Admin and Avatar */}
          <div className="flex items-center">
            <div className="relative ms-3">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent px-3 py-2 font-lexend text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                    >
                      {user?.name}
                      <img
                        src={`/storage/avatars/${auth.user.id}.png`}
                        alt={auth.user.name}
                        className="mx-2 h-10 w-10 rounded-full border border-custom-yellow"
                      />
                      <FaChevronDown
                        className="ml-2 h-2 w-2"
                        aria-hidden="true"
                      />
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Link
                    href={route("profile.edit")}
                    className="font-lexend"
                  >
                    Profile
                  </Dropdown.Link>
                  <Dropdown.Link
                    href={route("logout")}
                    className="font-lexend"
                    method="post"
                    as="button"
                  >
                    Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
        </div>

        <h2 className="mb-4 font-lexend text-xl font-bold">
          Edit Home Page Content
        </h2>

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
            />
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            className="w-full rounded-md bg-custom-yellow py-2 font-lexend font-semibold text-black hover:bg-yellow-600"
          >
            {processing ? "Saving..." : "Update Hero Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHeroService;
