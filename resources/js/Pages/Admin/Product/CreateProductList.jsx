import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "@/Components/Admin/Sidebar";
import Dropdown from "@/Components/Dropdown";

const CreateProductList = ({ auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    category_id: "",
    image_url: null,
    slug: "",
    name: "",
    description: "",
    price: "",
  });

  const [activeMenu, setActiveMenu] = useState("product-list");
  const user = auth.user;

  // Fungsi untuk memformat harga menjadi Rp.
  const formatRupiah = (value) => {
    let numberString = value.replace(/[^,\d]/g, "").toString();
    let split = numberString.split(",");
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return "Rp. " + rupiah;
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Set the formatted value in state
    setData("price", formatRupiah(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Menghapus format Rp. sebelum submit ke backend
    const formattedPrice = data.price.replace(/[^,\d]/g, "");

    // Menggunakan FormData untuk menangani pengunggahan file
    const formData = new FormData();
    formData.append("category_id", data.category_id);
    formData.append("slug", data.slug);
    formData.append("image_url", data.image_url);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", formattedPrice);

    post("/product-list", {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Product List has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          Inertia.visit("/product-list");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Product List.",
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
        <Head title="Create Product List | PT Ratu Bio Indonesia" />
        <div className="mb-4 flex w-full items-center justify-between">
          <Link
            href="/product-list"
            className="rounded bg-custom-yellow px-4 py-2 text-black hover:bg-yellow-500"
          >
            <IoChevronBackOutline className="h-4 w-4" />
          </Link>
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
          Create Product List
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="category_id"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Category ID
            </label>
            <input
              id="category_id"
              type="number"
              value={data.category_id}
              onChange={(e) => setData("category_id", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.category_id && (
              <span className="text-sm text-red-600">{errors.category_id}</span>
            )}
          </div>

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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.slug && (
              <span className="text-sm text-red-600">{errors.slug}</span>
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
              required
            />
            {errors.image_url && (
              <span className="text-sm text-red-600">{errors.image_url}</span>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.name && (
              <span className="text-sm text-red-600">{errors.name}</span>
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
            />
            {errors.description && (
              <span className="text-sm text-red-600">{errors.description}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block font-lexend text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              type="text"
              value={data.price}
              onChange={handlePriceChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.price && (
              <span className="text-sm text-red-600">{errors.price}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow py-2 font-lexend font-semibold text-black hover:bg-yellow-600"
          >
            {processing ? "Saving..." : "Save Product List"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductList;
