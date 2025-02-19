import { FaPlay } from "react-icons/fa";

export default function HeroCompany() {
  const data = {
    imageUrl: "/Home/HeroCompany/HeroCompany.png",
    youtubeLink: "https://www.youtube.com/@ratubioindonesia1684",
    title: "PT Ratu Bio Indonesia",
    description:
      "Hadir sebagai solusi sanitasi dan higiene yang berkualitas tinggi, bersama BioQueen. Kami, bersama BioQueen, berkomitmen untuk membantu masyarakat Indonesia dalam memperoleh produk perawatan kulit yang efikasi tinggi dan aman untuk jangka panjang.",
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center p-6 text-gray-800 lg:flex-row lg:p-12">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center py-4 lg:flex-row lg:space-x-12">
        {/* imageUrl Section */}
        <div className="relative mb-8 flex justify-center lg:mb-0 lg:w-1/3">
          <div className="relative h-60 w-full overflow-hidden rounded-lg lg:h-full">
            <img
              src={data.imageUrl}
              loading="lazy"
              className="h-full w-full object-cover"
              alt="Company imageUrl"
            />
            <button
              onClick={() => {
                window.open(data.youtubeLink);
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
            {data.title}
          </h1>
          <p className="sm:text-md font-regular font-lexend text-base text-gray-600 lg:text-lg">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
