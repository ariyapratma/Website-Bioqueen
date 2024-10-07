import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "@/Components/Admin/Sidebar";
import Dropdown from "@/Components/Dropdown";

const EditHeroReview = ({ dataHeroReview, auth }) => {
  const { data, setData, put, processing, errors } = useForm({
    name: dataHeroReview?.name || "",
    rating: dataHeroReview?.rating || "",
    comment: dataHeroReview?.comment || "",
  });

  const [activeMenu, setActiveMenu] = useState("hero-review");

  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Using FormData to handle file upload
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("rating", data.rating);
    formData.append("comment", data.comment);

    put(`/hero-review/${dataHeroReview.id}`, {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Review has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          Inertia.visit("/hero-review");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the Hero Review.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeMenu={activeMenu} />

      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="Edit Hero Review | PT Ratu Bio Indonesia" />

        <div className="mb-4 flex w-full items-center justify-between">
          <Link
            href="/hero-review"
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

        <h2 className="mb-4 font-lexend text-xl font-bold">Edit Hero Review</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.name && (
              <span className="text-sm text-red-600">{errors.name}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="rating"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Rating
            </label>
            <input
              id="rating"
              type="number"
              min="1"
              max="5"
              value={data.rating}
              onChange={(e) => setData("rating", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.rating && (
              <span className="text-sm text-red-600">{errors.rating}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={data.comment}
              onChange={(e) => setData("comment", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="4"
              required
            />
            {errors.comment && (
              <span className="text-sm text-red-600">{errors.comment}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow py-2 font-lexend font-semibold text-black hover:bg-yellow-600"
          >
            {processing ? "Saving..." : "Update Hero Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHeroReview;
