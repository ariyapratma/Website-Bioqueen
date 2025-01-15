import {
  MdOutlineCleanHands,
  MdOutlineMedicalServices,
  MdOutlineStarRate,
} from "react-icons/md";

const data = [
  {
    icon: MdOutlineCleanHands,
    title: "Dermatologist Expert",
    description:
      "Dikembangkan oleh para Expert yang memiliki pengalaman mumpuni di bidang Dermatologis.",
  },
  {
    icon: MdOutlineMedicalServices,
    title: "Excellent",
    description:
      "Diformulasikan dengan kaidah Kosmetologi Jepang dengan bahan baku yang berasal dari Eropa.",
  },
  {
    icon: MdOutlineStarRate,
    title: "Premium Quality",
    description:
      "Keamanan dan kualitas premium yang tidak bisa ditemui di Perusahaan maklon lain.",
  },
];

export default function HeroService() {
  return (
    <div className="relative flex flex-col items-center bg-white p-4 sm:p-6">
      {/* Hero Section */}
      <div
        className="relative mb-12 h-[300px] w-full bg-cover bg-center sm:h-[400px] lg:h-[500px]"
        style={{
          backgroundImage: "url('/Home/HeroService/HeroService.png')",
        }}
      >
        <div className="absolute inset-0 z-0 rounded-md bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-custom-yellow">
          <h1 className="text-center font-lexend text-xl font-medium sm:text-3xl md:text-4xl lg:text-5xl">
            We Always Listen To What You Need
          </h1>
        </div>
      </div>

      {/* Service Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6 md:px-8">
        {data.map((data, index) => (
          <div
            key={index}
            className="flex max-w-xs transform flex-col items-center rounded-lg bg-white p-4 text-center text-custom-yellow shadow-lg transition-transform duration-300 hover:scale-105 sm:p-6"
            style={{ minHeight: "250px" }}
          >
            <div className="mb-4">
              <data.icon size="48" />
            </div>
            <h6 className="mb-2 font-lexend text-lg font-medium sm:text-xl">
              {data.title}
            </h6>
            <p className="font-lexend text-sm text-gray-600 sm:text-base">
              {data.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
