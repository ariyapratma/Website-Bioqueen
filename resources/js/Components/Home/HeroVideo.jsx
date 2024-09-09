export default function HeroVideo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Main Content */}
      <div className="relative z-10 mb-6 text-center md:mb-8">
        <h1 className="mb-4 font-lexend text-3xl font-semibold text-black md:mb-6 md:text-5xl">
          Inovator dalam Sanitasi dan Kebersihan
        </h1>
        <p className="font-lexend text-sm text-gray-600 md:text-base">
          Berfokus pada pembuatan pembersih tangan, disinfektan, sabun
          antiseptik, sabun tangan, dan sabun khusus.
        </p>
      </div>

      {/* Video Section */}
      <div className="relative flex w-full max-w-4xl flex-col items-center">
        <div className="relative mb-4 h-0 w-full overflow-hidden rounded-xl pb-[56.25%] shadow-lg">
          <iframe
            className="absolute left-0 top-0 h-full w-full"
            src="https://www.youtube.com/embed/VVQepgaqZJY"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Journey of Natural Beauty"
          ></iframe>
        </div>

        {/* Button Section */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              window.location.href =
                "https://www.youtube.com/@ratubioindonesia1684";
            }}
            className="rounded-lg bg-custom-yellow px-8 py-2 font-lexend text-sm font-medium text-black transition-colors hover:bg-yellow-400 md:px-12 md:text-lg"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
}
