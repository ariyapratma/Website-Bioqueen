import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "@/Components/Admin/Sidebar";
import Dropdown from "@/Components/Dropdown";

const EditHeaderContact = ({ dataHeaderContact, auth }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: dataHeaderContact.title || "",
    description: dataHeaderContact.description || "",
    image_url: null,
  });

  const [activeMenu, setActiveMenu] = useState("header-contact");

  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Using FormData to handle file upload
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image_url", data.image_url);

    put(`/header-contact/${dataHeaderContact.id}`, {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Header Contact has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        }).then(() => {
          Inertia.visit("/header-contact");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the Header Contact.",
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
      {auth && (
        <Sidebar
          auth={auth}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      )}

      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="Edit Header Contact | PT Ratu Bio Indonesia" />

        <div className="mb-4 flex w-full items-center justify-between">
          <Link
            href="/header-contact"
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
          Edit Contact Page Content
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
              type="file"
              onChange={(e) => setData("image_url", e.target.files[0])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            {processing ? "Saving..." : "Update Header Contact"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHeaderContact;
