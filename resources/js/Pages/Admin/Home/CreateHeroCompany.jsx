import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from "@/Components/Admin/Sidebar";
import Dropdown from "@/Components/Dropdown";

const CreateHeroCompany = ({ auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    image_url: null,
    youtube_link: "",
    title: "",
    description: "",
  });

  const [activeMenu, setActiveMenu] = useState("hero-company");

  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Using FormData to handle file upload
    const formData = new FormData();
    formData.append("image_url", data.image_url);
    formData.append("youtube_link", data.youtube_link);
    formData.append("title", data.title);
    formData.append("description", data.description);

    post("/hero-company", {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Company has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          Inertia.visit("/hero-company");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Company.",
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
        <Head title="Create Hero Company | PT Ratu Bio Indonesia" />

        {/* Header */}
        <div className="mb-4 flex w-full items-center justify-between">
          <Link
            href="/hero-company"
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
                        src={
                          user?.avatar
                            ? `/storage/${user.avatar}`
                            : "/default-avatar.png"
                        }
                        className="mx-2 h-10 w-10 rounded-full border border-custom-yellow"
                      />
                      <svg
                        className="-me-0.5 ms-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
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
              htmlFor="youtube_link"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Youtube Link
            </label>
            <input
              id="youtube_link"
              type="text"
              value={data.youtube_link}
              onChange={(e) => setData("youtube_link", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.youtube_link && (
              <span className="text-sm text-red-600">
                {errors.youtube_link}
              </span>
            )}
          </div>

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

          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow py-2 font-lexend font-semibold text-black hover:bg-yellow-600"
          >
            {processing ? "Saving..." : "Save Hero Company"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHeroCompany;
