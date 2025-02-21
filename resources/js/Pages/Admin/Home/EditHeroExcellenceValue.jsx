import { Link, Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";

const EditHeroExcellenceValue = ({ dataHeroExcellenceValue, auth }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: dataHeroExcellenceValue.title || "",
    subtitle: dataHeroExcellenceValue.subtitle || "",
    heading1: dataHeroExcellenceValue.heading1 || "",
    content1: dataHeroExcellenceValue.content1 || "",
    heading2: dataHeroExcellenceValue.heading2 || "",
    content2: dataHeroExcellenceValue.content2 || "",
    heading3: dataHeroExcellenceValue.heading3 || "",
    content3: dataHeroExcellenceValue.content3 || "",
    heading4: dataHeroExcellenceValue.heading4 || "",
    content4: dataHeroExcellenceValue.content4 || "",
  });

  const [activeMenu, setActiveMenu] = useState("hero-excellence-value");

  const user = auth.user;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Using FormData to handle file upload
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("heading1", data.heading1);
    formData.append("content1", data.content1);
    formData.append("heading2", data.heading2);
    formData.append("content2", data.content2);
    formData.append("heading3", data.heading3);
    formData.append("content3", data.content3);
    formData.append("heading4", data.heading4);
    formData.append("content4", data.content4);

    put(`/hero-excellence-value/${dataHeroExcellenceValue.id}`, {
      data: formData,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Hero Excellence Value has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        }).then(() => {
          Inertia.visit("/hero-excellence-value");
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the Hero Excellence Value.",
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
        <Head title="Edit Hero Excellence Value | PT Ratu Bio Indonesia" />
        <Navbar auth={auth} />
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 font-lexend text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/hero-excellence-value"
            className="hover:text-black hover:underline"
          >
            Manage Hero Excellence Value
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-bold text-black">Edit Hero Excellence Value</span>
        </nav>
        {/* Title */}
        <h2 className="mb-4 font-lexend text-xl font-bold">
          Edit Home Page Content
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
          {[1, 2, 3, 4].map((index) => (
            <div key={index}>
              <div>
                <label
                  htmlFor={`heading${index}`}
                  className="block font-lexend text-sm font-medium text-gray-700"
                >
                  Heading {index}
                </label>
                <input
                  id={`heading${index}`}
                  type="text"
                  value={data[`heading${index}`]}
                  onChange={(e) =>
                    setData(`heading${index}`, e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                  required
                />
                {errors[`heading${index}`] && (
                  <span className="text-sm text-red-600">
                    {errors[`heading${index}`]}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor={`content${index}`}
                  className="block font-lexend text-sm font-medium text-gray-700"
                >
                  Content {index}
                </label>
                <textarea
                  id={`content${index}`}
                  value={data[`content${index}`]}
                  onChange={(e) =>
                    setData(`content${index}`, e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                  rows="4"
                  required
                />
                {errors[`content${index}`] && (
                  <span className="text-sm text-red-600">
                    {errors[`content${index}`]}
                  </span>
                )}
              </div>
            </div>
          ))}
          <button
            type="submit"
            disabled={processing}
            className="w-full rounded-md bg-custom-yellow px-6 py-2 font-lexend font-semibold text-black hover:bg-yellow-600 sm:w-auto"
          >
            {processing ? "Saving..." : "Update Hero Excellence Value"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHeroExcellenceValue;