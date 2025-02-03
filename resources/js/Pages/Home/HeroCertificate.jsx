import { usePage } from "@inertiajs/react";

const HeroCertificate = () => {
  const { props } = usePage();
  const { dataHeroCertificate } = props;

  return (
    <div className="flex w-full justify-center bg-white py-8 sm:py-10">
      <div className="flex w-full max-w-5xl flex-col items-center p-4 sm:p-6">
        {/* Title dan Subtitle */}
        <h1 className="mb-6 text-center font-lexend text-3xl font-medium text-black sm:mb-8 sm:text-4xl md:text-5xl">
          {dataHeroCertificate?.title || "No title available."}
        </h1>
        <p className="mb-8 max-w-xl text-center font-lexend text-sm text-gray-600 sm:mb-10 md:text-base">
          {dataHeroCertificate?.subtitle || "No subtitle available."}
        </p>

        {/* Menampilkan gambar sertifikat */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-14">
          {dataHeroCertificate?.image_url1 ||
          dataHeroCertificate?.image_url2 ||
          dataHeroCertificate?.image_url3 ||
          dataHeroCertificate?.image_url4 ||
          dataHeroCertificate?.image_url5 ? (
            <>
              {dataHeroCertificate.image_url1 && (
                <div className="flex h-20 w-20 transform items-center justify-center overflow-hidden rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-105 sm:h-24 sm:w-24 md:h-28 md:w-28">
                  <img
                    src={dataHeroCertificate.image_url1}
                    loading="lazy"
                    alt="Certificate 1"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              {dataHeroCertificate.image_url2 && (
                <div className="flex h-20 w-20 transform items-center justify-center overflow-hidden rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-105 sm:h-24 sm:w-24 md:h-28 md:w-28">
                  <img
                    src={dataHeroCertificate.image_url2}
                    loading="lazy"
                    alt="Certificate 2"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              {dataHeroCertificate.image_url3 && (
                <div className="flex h-20 w-20 transform items-center justify-center overflow-hidden rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-105 sm:h-24 sm:w-24 md:h-28 md:w-28">
                  <img
                    src={dataHeroCertificate.image_url3}
                    loading="lazy"
                    alt="Certificate 3"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              {dataHeroCertificate.image_url4 && (
                <div className="flex h-20 w-20 transform items-center justify-center overflow-hidden rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-105 sm:h-24 sm:w-24 md:h-28 md:w-28">
                  <img
                    src={dataHeroCertificate.image_url4}
                    loading="lazy"
                    alt="Certificate 4"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              {dataHeroCertificate.image_url5 && (
                <div className="flex h-20 w-20 transform items-center justify-center overflow-hidden rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-105 sm:h-24 sm:w-24 md:h-28 md:w-28">
                  <img
                    src={dataHeroCertificate.image_url5}
                    loading="lazy"
                    alt="Certificate 5"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
            </>
          ) : (
            <p className="font-lexend font-medium text-red-500">
              No images available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroCertificate;
