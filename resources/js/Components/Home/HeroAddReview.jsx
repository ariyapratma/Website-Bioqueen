import Avatar from "react-avatar";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

export default function HeroAddReview() {
  const data = {
    name: "Rizki Fauzan",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
  };
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
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
        <div className="absolute right-4 top-4 flex items-center">
          <Avatar
            name={data.name}
            src={data.avatar}
            size="50"
            round={true}
            className="border-2 border-white"
          />
        </div>
        <form className="mt-12">
          <div className="mb-6 flex flex-col items-start">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-custom-yellow"
            />
          </div>
          <div className="mb-6 flex flex-col items-start">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Message
            </label>
            <textarea
              placeholder="Enter Your Message"
              className="w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-custom-yellow"
              rows="4"
            ></textarea>
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
                    index < rating ? "text-custom-yellow" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-custom-yellow px-6 py-3 font-semibold text-white transition-colors hover:bg-yellow-400"
          >
            Send Review
          </button>
        </form>
      </div>
    </div>
  );
}
