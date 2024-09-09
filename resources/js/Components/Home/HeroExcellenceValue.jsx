import { FaCheckCircle } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { PiCertificate } from "react-icons/pi";
import { MdSupportAgent } from "react-icons/md";

const data = [
  {
    title: "Services Fast",
    description:
      "Kami memastikan layanan konsultasi yang cepat dalam produk kami.",
    icon: <RiCustomerService2Line />,
  },
  {
    title: "Certified",
    description: "Produk kami disertifikasi oleh standar nasional.",
    icon: <PiCertificate />,
  },
  {
    title: "Customer Support",
    description: "Dukungan pelanggan 24/7 untuk membantu Anda kapan saja.",
    icon: <MdSupportAgent />,
  },
  {
    title: "Eco-Friendly",
    description: "Berkomitmen terhadap praktik-praktik ramah lingkungan.",
    icon: <FaCheckCircle />,
  },
];

export default function HeroExcellenceValue() {
  return (
    <div className="flex flex-col items-center p-4 text-center sm:p-6">
      {" "}
      {/* Menambahkan text-center di container utama */}
      <h1 className="mb-4 font-lexend text-3xl font-semibold text-black md:mb-6 md:text-5xl">
        What Makes Us Different?
      </h1>
      <p className="mb-8 max-w-xl text-center font-lexend text-sm text-gray-600 sm:mb-10 md:text-base">
        Kami percaya bahwa kualitas dan dedikasi kami yang tak tergoyahkan
        terhadap kesuksesan klien menjadikan kami pilihan yang tepat untuk semua
        kebutuhan anda.
      </p>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {data.map((data, index) => (
          <div
            key={index}
            className="flex max-w-[85%] transform flex-col items-center rounded-lg bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:max-w-xs"
          >
            <div className="mb-2 text-3xl text-custom-yellow sm:mb-4 sm:text-4xl">
              {data.icon}
            </div>
            <h6 className="mb-1 font-lexend text-lg font-medium text-black sm:mb-2 sm:text-xl">
              {data.title}
            </h6>
            <p className="font-lexend text-xs text-gray-600 sm:text-sm">
              {data.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
