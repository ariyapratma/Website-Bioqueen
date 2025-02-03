import { usePage } from "@inertiajs/react";

const HeroWhyChooseValue = () => {
  const { props } = usePage();
  const { dataHeroWhyChoose } = props;

  return (
    <div className="mb-2 flex items-center justify-center py-12">
      <div className="w-full max-w-7xl p-6">
        <div className="hero-content flex flex-col lg:flex-row-reverse lg:items-start">
          <div className="order-2 flex w-full flex-col items-center lg:order-1 lg:ml-8 lg:w-1/2">
            {/* Display images if available */}
            {dataHeroWhyChoose?.image_url1 ? (
              <img
                key="image1"
                src={dataHeroWhyChoose.image_url1}
                loading="lazy"
                className="mb-4 mt-4 w-full max-w-xl rounded-2xl object-cover sm:h-auto sm:w-auto lg:mt-12"
                alt="Image 1"
              />
            ) : (
              <p className="font-lexend font-medium text-red-500">
                No image 1 available.
              </p>
            )}
            {dataHeroWhyChoose?.image_url2 ? (
              <img
                key="image2"
                src={dataHeroWhyChoose.image_url2}
                loading="lazy"
                className="mb-4 mt-4 w-full max-w-xl rounded-2xl object-cover sm:h-auto sm:w-auto lg:mt-12"
                alt="Image 2"
              />
            ) : (
              <p className="font-lexend font-medium text-red-500">
                No image 2 available.
              </p>
            )}
          </div>
          <div className="order-1 w-full lg:order-2 lg:w-1/2">
            <h1 className="mb-4 max-w-xl text-left font-lexend text-4xl font-medium text-black sm:text-5xl">
              {dataHeroWhyChoose?.title}{" "}
              <span className="font-bold">PT Ratu Bio Indonesia?</span>
            </h1>
            <h6 className="mb-8 rounded-xl bg-custom-yellow p-4 text-left font-lexend text-xl font-bold text-black sm:p-6 sm:text-xl">
              {dataHeroWhyChoose?.subtitle || "No subtitle available."}
            </h6>
            <div className="mb-8">
              <h6 className="mb-2 text-left font-lexend text-xl font-medium text-black sm:text-2xl">
                {dataHeroWhyChoose?.heading1 || "No heading available."}
              </h6>
              <p className="font-regular mb-8 text-left font-lexend text-sm text-gray-600 sm:text-lg">
                {dataHeroWhyChoose?.content1 || "No content available."}
              </p>
            </div>
            <div>
              <h6 className="mb-2 text-left font-lexend text-xl font-medium text-black sm:text-2xl">
                {dataHeroWhyChoose?.heading2 || "No heading available."}
              </h6>
              <p className="font-regular mb-8 text-left font-lexend text-sm text-gray-600 sm:text-lg">
                {dataHeroWhyChoose?.content2 || "No content available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWhyChooseValue;
