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
    <div className="flex flex-col items-center p-4 sm:p-6 mb-24">
      <h1 className="text-3xl md:text-5xl text-black font-lexend font-semibold mb-4 md:mb-6">
        Add Your Review
      </h1>
      <p className="text-center text-sm md:text-base font-lexend text-gray-600 mb-8 sm:mb-10 max-w-xl">
        Kami yakin bahwa kepercayaan dan ulasan positif dari pelanggan adalah
        bukti nyata dari komitmen kami yang kuat terhadap kesuksesan klien.
      </p>
      <div className="relative w-full max-w-3xl bg-white shadow-lg p-8 rounded-lg border border-gray-200">
        <div className="absolute top-4 right-4 flex items-center">
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
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
            />
          </div>
          <div className="mb-6 flex flex-col items-start">
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              Message
            </label>
            <textarea
              placeholder="Enter Your Message"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-6 flex flex-col items-start">
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              Rating
            </label>
            <div className="flex gap-1 mb-4">
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
            className="w-full bg-custom-yellow text-white py-3 px-6 rounded-md font-semibold hover:bg-yellow-400 transition-colors"
          >
            Send Review
          </button>
        </form>
      </div>
    </div>
  );
}
