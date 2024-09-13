import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import { usePage } from "@inertiajs/react";
import { FaPlay } from "react-icons/fa";

const Welcome = ({ auth }) => {
  const { props } = usePage();
  const { dataHeaderHome, dataHeroFlyer, dataHeroCompany } = props;

  return (
    <div className="flex min-h-screen flex-col">
      <Head title="Home | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/* HeaderHome */}
        <div className="relative h-[600px] w-full overflow-hidden md:h-[700px] lg:h-[900px]">
          {/* Background Image */}
          <img
            src={dataHeaderHome?.image_url}
            alt="Header Background"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white lg:p-8">
            <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              {dataHeaderHome?.title}
            </h1>
            <p className="mb-6 text-center text-base sm:text-lg md:text-xl lg:text-xl">
              {dataHeaderHome?.description}
            </p>
            <button
              onClick={() => {
                window.location.href = dataHeaderHome?.whatsapp_link;
              }}
              className="text-base-content rounded-lg bg-custom-yellow px-4 py-2 text-base font-semibold transition-colors hover:bg-yellow-400 sm:px-6 sm:py-3 sm:text-lg"
            >
              Konsultasikan Sekarang
            </button>
          </div>
        </div>
        {/* Hero Flyer */}
        <div className="flex w-full items-center justify-center p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            {dataHeroFlyer && dataHeroFlyer.length > 0 ? (
              dataHeroFlyer.map((flyer, index) => (
                <div
                  key={index}
                  className="w-full overflow-hidden bg-white shadow-lg sm:w-[500px] md:w-[600px] lg:w-[800px]"
                >
                  <img
                    src={flyer.image_url}
                    loading="lazy"
                    alt={`Flyer ${index + 1}`}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))
            ) : (
              <p className="text-center font-lexend font-medium text-red-500">
                Tidak ada flyer yang tersedia saat ini.
              </p>
            )}
          </div>
        </div>
        {/* Hero Company */}
        <div className="relative flex w-full flex-col items-center justify-center p-6 text-gray-800 lg:flex-row lg:p-12">
          <div className="mx-auto flex max-w-screen-xl flex-col items-center py-4 lg:flex-row lg:space-x-12">
            {/* image_url Section */}
            <div className="relative mb-8 flex justify-center lg:mb-0 lg:w-1/3">
              <div className="relative h-60 w-full overflow-hidden rounded-lg lg:h-full">
                <img
                  src={dataHeroCompany?.image_url}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  alt="Company imageUrl"
                />
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
                {dataHeroCompany?.title}
              </h1>
              <p className="sm:text-md font-regular font-lexend text-base text-gray-600 lg:text-lg">
                {dataHeroCompany?.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
