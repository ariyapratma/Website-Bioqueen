import { usePage } from "@inertiajs/react";
import { RiCustomerService2Line } from "react-icons/ri";
import { PiCertificate } from "react-icons/pi";
import { MdSupportAgent } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const HeroExcellenceValue = () => {
  const { props } = usePage();
  const { dataHeroExcellenceValue } = props;

  return (
    <div className="flex flex-col items-center p-4 text-center sm:p-6">
      {/* Menambahkan text-center di container utama */}
      <h1 className="mb-4 font-lexend text-3xl font-semibold text-black md:mb-6 md:text-5xl">
        {dataHeroExcellenceValue?.title ? (
          dataHeroExcellenceValue.title
        ) : (
          <p className="font-lexend font-medium text-red-500">
            No title available.
          </p>
        )}
      </h1>
      <p className="mb-8 max-w-xl text-center font-lexend text-sm text-gray-600 sm:mb-10 md:text-base">
        {dataHeroExcellenceValue?.subtitle || "No subtitle available."}
      </p>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {/* Bagian 1 */}
        <div className="flex max-w-[85%] transform flex-col items-center rounded-lg bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:max-w-xs">
          <div className="mb-4 rounded-full bg-custom-yellow p-4">
            <RiCustomerService2Line size="32" />
          </div>
          <h6 className="mb-1 font-lexend text-lg font-medium text-black sm:mb-2 sm:text-xl">
            {dataHeroExcellenceValue?.heading1 || "No heading available."}
          </h6>
          <p className="font-lexend text-xs text-gray-600 sm:text-sm">
            {dataHeroExcellenceValue?.content1 || "No content available."}
          </p>
        </div>

        {/* Bagian 2 */}
        <div className="flex max-w-[85%] transform flex-col items-center rounded-lg bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:max-w-xs">
          <div className="mb-4 rounded-full bg-custom-yellow p-4">
            <PiCertificate size="32" />
          </div>
          <h6 className="mb-1 font-lexend text-lg font-medium text-black sm:mb-2 sm:text-xl">
            {dataHeroExcellenceValue?.heading2 || "No heading available."}
          </h6>
          <p className="font-lexend text-xs text-gray-600 sm:text-sm">
            {dataHeroExcellenceValue?.content2 || "No content available."}
          </p>
        </div>

        {/* Bagian 3 */}
        <div className="flex max-w-[85%] transform flex-col items-center rounded-lg bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:max-w-xs">
          <div className="mb-4 rounded-full bg-custom-yellow p-4">
            <MdSupportAgent size="32" />
          </div>
          <h6 className="mb-1 font-lexend text-lg font-medium text-black sm:mb-2 sm:text-xl">
            {dataHeroExcellenceValue?.heading3 || "No heading available."}
          </h6>
          <p className="font-lexend text-xs text-gray-600 sm:text-sm">
            {dataHeroExcellenceValue?.content3 || "No content available."}
          </p>
        </div>

        {/* Bagian 4 */}
        <div className="flex max-w-[85%] transform flex-col items-center rounded-lg bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:max-w-xs">
          <div className="mb-4 rounded-full bg-custom-yellow p-4">
            <FaCheckCircle size="32" />
          </div>
          <h6 className="mb-1 font-lexend text-lg font-medium text-black sm:mb-2 sm:text-xl">
            {dataHeroExcellenceValue?.heading4 || "No heading available."}
          </h6>
          <p className="font-lexend text-xs text-gray-600 sm:text-sm">
            {dataHeroExcellenceValue?.content4 || "No content available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroExcellenceValue;
