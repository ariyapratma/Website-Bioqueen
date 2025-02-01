import { usePage } from "@inertiajs/react";

const HeroVideo = () => {
  const { props } = usePage();
  const { dataHeroVideo } = props;

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Main Content */}
      <div className="relative z-10 mb-6 text-center md:mb-8">
        <h1 className="mb-4 font-lexend text-3xl font-semibold text-black md:mb-6 md:text-5xl">
          {dataHeroVideo?.title}
        </h1>
        <p className="font-lexend text-sm text-gray-600 md:text-base">
          {dataHeroVideo?.subtitle}
        </p>
      </div>

      {/* Video Section */}
      <div className="relative flex w-full max-w-4xl flex-col items-center">
        <div className="relative mb-4 h-0 w-full overflow-hidden rounded-xl pb-[56.25%] shadow-lg">
          {dataHeroVideo?.youtube_link ? (
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src={dataHeroVideo.youtube_link}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video"
            ></iframe>
          ) : (
            <p className="font-lexend font-medium text-red-500">
              No link youtube available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;
