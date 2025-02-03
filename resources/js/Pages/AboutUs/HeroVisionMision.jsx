import { usePage } from "@inertiajs/react";

const HeroVisionMision = () => {
  const { props } = usePage();
  const { dataHeroVisionMision } = props;

  return (
    <div className="container mx-auto mb-2 p-6 px-4 py-8">
      {/* Content Section */}
      <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white lg:flex-row">
        {/* Text Section */}
        <div className="flex flex-col p-6 lg:w-1/2">
          <h1 className="mb-4 font-lexend text-3xl font-bold text-black sm:text-4xl">
            {dataHeroVisionMision?.title || "No title available."}
          </h1>
          <p className="mb-4 font-lexend font-medium text-gray-600">
            {dataHeroVisionMision?.subtitle || "No subtitle available."}
          </p>
          <div className="space-y-2 font-lexend font-medium text-gray-600">
            <p>
              {dataHeroVisionMision?.description1 || "No description available."}
            </p>
            <p>
              {dataHeroVisionMision?.description2 || "No description available."}
            </p>
            <p>
              {dataHeroVisionMision?.description3 || "No description available."}
            </p>
            <p>
              {dataHeroVisionMision?.description4 || "No description available."}
            </p>
            <p>
              {dataHeroVisionMision?.description5 || "No description available."}
            </p>
            <p>
              {dataHeroVisionMision?.description6 || "No description available."}
            </p>
          </div>
        </div>
        {/* Image Section */}
        <div className="flex items-center justify-center lg:w-1/2">
          {dataHeroVisionMision?.image_url ? (
            <img
              src={dataHeroVisionMision.image_url}
              loading="lazy"
              alt="Visi Misi"
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

export default HeroVisionMision;
