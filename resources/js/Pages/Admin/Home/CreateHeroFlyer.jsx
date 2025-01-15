import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "@/Components/Admin/Sidebar";
import Dropdown from "@/Components/Dropdown";

const CreateHeroFlyer = ({ auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    image_url: null,
  });

  const [activeMenu, setActiveMenu] = useState("hero-flyer");

  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Using FormData to handle file upload
    const formData = new FormData();
    formData.append("image_url", data.image_url);

    post("/hero-flyer", {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Flyer has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          Inertia.visit("/hero-flyer");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Hero Flyer.",
          icon: "error",
          confirmButtonText: "OK",
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
      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="Create Hero Flyer | PT Ratu Bio Indonesia" />

        {/* Header */}
        <div className="mb-4 flex w-full items-center justify-between">
          <Link
            href="/hero-flyer"
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

          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow py-2 font-lexend font-semibold text-black hover:bg-yellow-600"
          >
            {processing ? "Saving..." : "Save Hero Flyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHeroFlyer;
