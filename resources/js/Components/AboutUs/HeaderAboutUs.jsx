export default function HeaderAboutUs() {
  const data = {
    title: "About Company",
    description:
      "PT. Ratu Bio Indonesia, maklon sabun dan sanitasi terpercaya sejak 2012 dengan lisensi BPOM RI dan CPKB.",
    imageUrl: "AboutUs/HeaderAboutUs/HeaderAboutUs.png",
  };

  return (
    <div className="relative h-[30rem] w-full overflow-hidden">
      {/* Hero Image */}
      <img
        src={data.imageUrl}
        loading="lazy"
        className="h-full w-full object-cover"
        alt="Header AboutUs"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-40 px-6 pt-6 sm:px-12 md:px-24 lg:px-36 xl:px-48">
        <h2 className="mb-4 pt-40 font-lexend text-5xl font-bold text-white">
          {data.title}
        </h2>
        <p className="text-md max-w-md font-lexend font-bold text-white">
          {data.description}
        </p>
      </div>
    </div>
  );
}
