import { usePage } from "@inertiajs/react";

const HeaderHome = () => {
  const { props } = usePage();
  const { dataHeaderHome } = props;

  return (
    <div className="relative h-[600px] w-full overflow-hidden md:h-[700px] lg:h-[900px]">
      {/* Background Image */}
      {dataHeaderHome?.image_url ? (
        <img
          // src={dataHeaderHome?.image_url}
          src={`${dataHeaderHome.image_url}?${new Date().getTime()}`}
          alt="Header Home"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <p className="font-lexend font-medium text-red-500">
          No image available.
        </p>
      )}

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-4 px-6 pt-6 text-white sm:px-12 md:px-24 lg:p-8 lg:px-36 xl:px-48">
        <h1 className="mb-4 text-center font-lexend text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          {dataHeaderHome?.title || "No title available."}
        </h1>
        <p className="font-regular mb-6 text-center font-lexend text-base sm:text-lg md:text-xl lg:text-xl">
          {dataHeaderHome?.description || "No description available."}
        </p>
        <button
          onClick={() => {
            window.location.href = dataHeaderHome?.whatsapp_link;
          }}
          className="text-base-content rounded-lg bg-custom-yellow px-4 py-2 font-lexend text-base font-semibold text-black transition-colors hover:bg-yellow-600 sm:px-6 sm:py-3 sm:text-lg"
        >
          Konsultasikan Sekarang
        </button>
      </div>
    </div>
  );
};

export default HeaderHome;
