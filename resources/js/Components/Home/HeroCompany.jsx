import { FaPlay } from "react-icons/fa";

export default function HeroCompany() {
  const data = {
    imageUrl: "/Home/HeroCompany/HeroCompany.png",
    youtubeLink: "https://www.youtube.com/@ratubioindonesia1684",
    title: "PT RATU BIO INDONESIA",
    description:
      "Hadir sebagai solusi sanitasi dan higiene yang berkualitas tinggi, bersama BioQueen. Kami, bersama BioQueen, berkomitmen untuk membantu masyarakat Indonesia dalam memperoleh produk perawatan kulit yang efikasi tinggi dan aman untuk jangka panjang. Mitra Aesthetic Medic juga telah memberikan kontribusi signifikan terhadap kesehatan kulit masyarakat Indonesia.",
  };

  return (
    <div className="relative w-full text-gray-800 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-12 max-w-screen-xl mx-auto py-4">
        {/* imageUrl Section */}
        <div className="relative mb-8 lg:mb-0 lg:w-1/3 flex justify-center">
          <div className="relative w-full h-60 lg:h-full rounded-lg overflow-hidden">
            <img
              src={data.imageUrl}
              loading="lazy"
              className="w-full h-full object-cover"
              alt="Company imageUrl"
            />
            <button
              onClick={() => {
                window.open(data.youtubeLink);
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-blue-600 text-white rounded-full p-4 hover:bg-blue-700 transition-transform transform hover:scale-110">
                <FaPlay className="w-8 h-8" />
              </div>
            </button>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-2/3">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl text-black font-medium mb-6 font-lexend leading-tight">
            {data.title}
          </h1>
          <p className="text-base sm:text-md lg:text-lg text-gray-600 font-lexend font-regular">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
