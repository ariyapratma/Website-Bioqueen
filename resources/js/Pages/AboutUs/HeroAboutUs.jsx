import { usePage } from "@inertiajs/react";

const HeroAboutUs = () => {
  const { props } = usePage();
  const { dataHeroAboutUs } = props;

  return (
    <div className="container mx-auto mb-2 p-6 px-4 py-8">
      {/* Content Section */}
      <div className="flex w-full flex-col overflow-hidden lg:flex-row">
        {/* Text Section */}
        <div className="flex flex-col p-6 lg:w-1/2">
          <h1 className="mb-4 font-lexend text-3xl font-bold text-black sm:text-4xl">
            {dataHeroAboutUs?.title || "No title available."}
          </h1>
          <p className="mb-4 font-lexend font-medium text-gray-600">
            {dataHeroAboutUs?.description1 || "No description available."}
          </p>
          <p className="mb-4 font-lexend font-medium text-gray-600">
            {dataHeroAboutUs?.description2 || "No description available."}
          </p>
          <p className="font-lexend font-medium text-gray-600">
            {dataHeroAboutUs?.description3 || "No description available."}
          </p>
        </div>
        {/* Image Section */}
        <div className="flex items-center justify-center lg:w-1/2">
          {dataHeroAboutUs?.image_url ? (
            <img
              src={dataHeroAboutUs.image_url}
              loading="lazy"
              alt="Company PT Ratu Bio Indonesia"
              className="h-auto w-full max-w-lg rounded-lg object-cover lg:max-h-[600px]"
            />
          ) : (
            <p className="font-lexend font-medium text-red-500">
              No image available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroAboutUs;
