import { usePage } from "@inertiajs/react";
import { FaPlay } from "react-icons/fa";

const HeroCompany = () => {
  const { props } = usePage();
  const { dataHeroCompany } = props;

  return (
    <div className="relative flex w-full flex-col items-center justify-center p-6 text-gray-800 lg:flex-row lg:p-12">
      {/* Hero Company */}
      <div className="mx-auto flex max-w-screen-xl flex-col items-center py-4 lg:flex-row lg:space-x-12">
        {/* image_url Section */}
        <div className="relative mb-8 flex justify-center lg:mb-0 lg:w-1/3">
          <div className="relative h-60 w-full overflow-hidden rounded-lg lg:h-full">
            {dataHeroCompany?.image_url ? (
              <img
                src={dataHeroCompany.image_url}
                loading="lazy"
                className="h-full w-full object-cover"
                alt="Company"
              />
            ) : (
              <p className="font-lexend font-medium text-red-500">
                No <br />
                image <br />
                available.
              </p>
            )}
            <button
              onClick={() => {
                window.open(dataHeroCompany?.youtube_link);
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="transform rounded-full bg-blue-600 p-4 text-white transition-transform hover:scale-110 hover:bg-blue-700">
                <FaPlay className="h-8 w-8" />
              </div>
            </button>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center lg:w-2/3 lg:items-start lg:text-left">
          <h1 className="mb-6 font-lexend text-3xl font-medium leading-tight text-black sm:text-4xl lg:text-6xl">
            {dataHeroCompany?.title || "No title available."}
          </h1>
          <p className="sm:text-md font-regular font-lexend text-base text-gray-600 lg:text-lg">
            {dataHeroCompany?.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroCompany;
