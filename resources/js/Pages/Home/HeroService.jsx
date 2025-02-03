import React from "react";
import {
  MdOutlineCleanHands,
  MdOutlineMedicalServices,
  MdOutlineStarRate,
} from "react-icons/md";
import { usePage } from "@inertiajs/react";

const HeroService = () => {
  const { props } = usePage();
  const { dataHeroService } = props;

  return (
    <div className="relative flex flex-col items-center bg-white p-4 sm:p-6">
      {/* Hero Section */}
      <div className="relative mb-12 w-full sm:h-[400px] lg:h-[500px]">
        {dataHeroService?.image_url ? (
          <img
            src={dataHeroService.image_url}
            loading="lazy"
            alt="Hero Service Background"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <p className="font-lexend font-medium text-red-500">
            No image available.
          </p>
        )}
        <div className="absolute inset-0 z-0 rounded-md bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-custom-yellow">
          <h1 className="text-center font-lexend text-xl font-medium sm:text-3xl md:text-4xl lg:text-5xl">
            {dataHeroService?.title || "No title available."}
          </h1>
        </div>
      </div>

      {/* Service Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6 md:px-8">
        <div
          className="flex max-w-xs transform flex-col items-center rounded-lg bg-white p-4 text-center text-black shadow-lg transition-transform duration-300 hover:scale-105 sm:p-6"
          style={{ minHeight: "250px" }}
        >
          <div className="mb-4 rounded-full bg-custom-yellow p-4">
            <MdOutlineCleanHands size="48" />
          </div>
          <h6 className="mb-2 font-lexend text-lg font-medium sm:text-xl">
            {dataHeroService?.heading1 || "No heading available."}
          </h6>
          <p className="font-lexend text-sm text-gray-600 sm:text-base">
            {dataHeroService?.content1 || "No content available."}
          </p>
        </div>

        <div
          className="flex max-w-xs transform flex-col items-center rounded-lg bg-white p-4 text-center text-black shadow-lg transition-transform duration-300 hover:scale-105 sm:p-6"
          style={{ minHeight: "250px" }}
        >
          <div className="mb-4 rounded-full bg-custom-yellow p-4">
            <MdOutlineMedicalServices size="48" />
          </div>
          <h6 className="mb-2 font-lexend text-lg font-medium sm:text-xl">
            {dataHeroService?.heading2 || "No heading available."}
          </h6>
          <p className="font-lexend text-sm text-gray-600 sm:text-base">
            {dataHeroService?.content2 || "No content available."}
          </p>
        </div>

        <div
          className="flex max-w-xs transform flex-col items-center rounded-lg bg-white p-4 text-center text-black shadow-lg transition-transform duration-300 hover:scale-105 sm:p-6"
          style={{ minHeight: "250px" }}
        >
          <div className="mb-4 rounded-full bg-custom-yellow p-4">
            <MdOutlineStarRate size="48" />
          </div>
          <h6 className="mb-2 font-lexend text-lg font-medium sm:text-xl">
            {dataHeroService?.heading3 || "No heading available."}
          </h6>
          <p className="font-lexend text-sm text-gray-600 sm:text-base">
            {dataHeroService?.content3 || "No content available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroService;
