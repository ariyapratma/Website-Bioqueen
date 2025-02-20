import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function HeroAddReview() {
  const { data, setData, post, reset } = useForm({
    name: "",
    comment: "",
    rating: 0,
  });

  const [errors, setErrors] = useState({});

  const handleStarClick = (index) => {
    setData("rating", index + 1);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.name) newErrors.name = "Name is required.";
    if (!data.comment) newErrors.comment = "Comment is required.";
    if (data.rating === 0) newErrors.rating = "Rating is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    post(route("user.hero-review.store"), {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Review has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
          scrollbarPadding: false,
          backdrop: false,
        }).then(() => {
          reset();
          setErrors({});
        });
      },
      onError: () => {
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the Review.",
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
    <div className="mb-24 flex flex-col items-center p-4 sm:p-6">
      <h1 className="mb-4 font-lexend text-3xl font-semibold text-black md:mb-6 md:text-5xl">
        Add Your Review
      </h1>
      <p className="mb-8 max-w-xl text-center font-lexend text-sm text-gray-600 sm:mb-10 md:text-base">
        Kami yakin bahwa kepercayaan dan ulasan positif dari pelanggan adalah
        bukti nyata dari komitmen kami yang kuat terhadap kesuksesan klien.
      </p>
      <div className="relative w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="mt-12">
          <div className="mb-6 flex flex-col items-start">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={data.name}
              onChange={(e) => {
                setData("name", e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } p-4  focus:border-black focus:ring-black`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="mb-6 flex flex-col items-start">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Message
            </label>
            <textarea
              placeholder="Enter Your Message"
              value={data.comment}
              onChange={(e) => {
                setData("comment", e.target.value);
                setErrors((prev) => ({ ...prev, comment: "" }));
              }}
              className={`w-full rounded-md border ${
                errors.comment ? "border-red-500" : "border-gray-300"
              } p-4 focus:border-black focus:ring-black`}
              rows="4"
            ></textarea>
            {errors.comment && (
              <p className="mt-1 text-xs text-red-500">{errors.comment}</p>
            )}
          </div>
          <div className="mb-6 flex flex-col items-start">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Rating
            </label>
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`cursor-pointer ${
                    index < data.rating ? "text-custom-yellow" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
            {errors.rating && (
              <p className="mt-1 text-xs text-red-500">{errors.rating}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full rounded-md bg-custom-yellow px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-600`}
          >
            Send Review
          </button>
        </form>
      </div>
    </div>
  );
}
