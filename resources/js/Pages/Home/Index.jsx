import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import HeroAddReview from "@/Components/Home/HeroAddReview";

/* Icon HeroCompany */
import { FaPlay } from "react-icons/fa";

/* Icon HeroService */
import {
  MdOutlineCleanHands,
  MdOutlineMedicalServices,
  MdOutlineStarRate,
} from "react-icons/md";

/* Icon HeroExcellenceValue */
import { FaCheckCircle } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { PiCertificate } from "react-icons/pi";
import { MdSupportAgent } from "react-icons/md";

/* Icon HeroReview */
import Avatar from "react-avatar";
import { FaStar } from "react-icons/fa";

/* Icon HeroAddReview */
import { useState } from "react";

{
  /* Data HeaderHome */
}
const dataHeaderHome = {
  title: "Jasa Maklon Sanitasi dan Higiene",
  description: "Mau Buat Brand Sabun, Kosmetik Dan Skincare Kamu Sendiri?",
  buttonText: "Konsultasikan Sekarang",
  imageUrl: "/Home/HeaderHome/HeaderHome.jpg",
  whatsappLink: "https://wa.me/6282162637186",
};

{
  /* Data HeroFlyer */
}
const dataFlyer = [
  {
    imageUrl: "/Home/HeroFlyer/HeroFlyer.png",
  },
  {
    imageUrl: "/Home/HeroFlyer/HeroFlyer.png",
  },
];

/* Data HeroCompany */
const dataHeroCompany = {
  imageUrl: "/Home/HeroCompany/HeroCompany.png",
  youtubeLink: "https://www.youtube.com/@ratubioindonesia1684",
  title: "PT RATU BIO INDONESIA",
  description:
    "Hadir sebagai solusi sanitasi dan higiene yang berkualitas tinggi, bersama BioQueen. Kami, bersama BioQueen, berkomitmen untuk membantu masyarakat Indonesia dalam memperoleh produk perawatan kulit yang efikasi tinggi dan aman untuk jangka panjang. Mitra Aesthetic Medic juga telah memberikan kontribusi signifikan terhadap kesehatan kulit masyarakat Indonesia.",
};

/* Data WhyChoose */
const dataWhyChoose = {
  title: "Mengapa HARUS Memilih PT Ratu Bio Indonesia?",
  subtitle: "Menyesuaikan Kebutuhan Pelanggan",
  sections: [
    {
      heading: "Kustom Produk",
      content:
        "Kami bisa mewujudkan produk kosmetik impian Anda dengan aneka macam bahan aktif, warna, aroma, kemasan yang selalu mengikuti tren pasar kosmetik dengan berstandar CPKB Grade A dan BPOM.",
    },
    {
      heading: "Minimum Kuantiti Pemesanan Bervariasi",
      content:
        "Jumlah minimum pemesanan dapat dipilih sesuai keinginan berdasarkan paket yang tersedia sehingga bisa menyesuaikan anggaran Anda.",
    },
  ],
  imageUrl: [
    "/Home/HeroWhyChooseValue/HeroWhyChoose1.jpg",
    "/Home/HeroWhyChooseValue/HeroWhyChoose2.jpg",
  ],
};

/* Data HeroMaklonValue */
const dataHeroMaklonValue = {
  title: "Maklon Harga Rendah dengan Kualitas Mewah",
  sections: [
    {
      heading: "Harga Bersaing",
      content:
        "Kami bisa menyesuaikan anggaran produk kosmetikmu mulai dari bahan baku hingga kemasan dengan biaya yang dapat disepakati bersama untuk memulai bisnis sabun.",
      images: "/Home/HeroMaklonValue/HeroMaklonValue1.jpg",
    },
    {
      heading: "Jaminan Aman dan Berkualitas",
      content:
        "Kami bisa menyesuaikan anggaran produk kosmetikmu mulai dari bahan baku hingga kemasan dengan biaya yang dapat disepakati bersama untuk memulai bisnis sabun.",
      images: "/Home/HeroMaklonValue/HeroMaklonValue2.jpg",
    },
  ],
};

{
  /* Data HeroFacilitiesValue */
}
const dataHeroFacilitiesValue = {
  title: "Fasilitas Modern & Sesuai Standar ISO",
  sections: [
    {
      heading: "Mesin & Peralatan Canggih",
      content:
        "Kami memiliki mesin pengolah yang canggih dan terkomputerisasi, dirancang untuk memproses dengan kapasitas tinggi dan memastikan produk berkualitas tinggi.",
      images: "/Home/HeroFacilitiesValue/HeroFacilitiesValue1.jpg",
    },
    {
      heading: "Gudang Penyimpanan Khusus",
      content:
        "Kami memiliki gudang penyimpanan yang luas dengan sistem penataan khusus. Terdiri dari tiga area terpisah, yaitu untuk bahan baku, bahan kemas, dan produk jadi.",
      images: "/Home/HeroFacilitiesValue/HeroFacilitiesValue2.jpg",
    },
  ],
};

/* Data HeroCertificate */
const dataHeroCerfiticate = [
  {
    title: "Certificate 1",
    images: "/Home/HeroCertificate/Certificate1.png",
  },
  {
    title: "Certificate 2",
    images: "/Home/HeroCertificate/Certificate2.png",
  },
  {
    title: "Certificate 3",
    images: "/Home/HeroCertificate/Certificate3.png",
  },
  {
    title: "Legal 4",
    images: "/Home/HeroCertificate/Certificate4.png",
  },
  {
    title: "Legal 5",
    images: "/Home/HeroCertificate/Certificate5.png",
  },
];

/* Data HeroService */
const dataHeroService = [
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
      "Keamanan dan kualitas premium yang tidak bisa ditemui di Perusahaan Kosmetik lain.",
  },
];

/* Data HeroExcellenceValue */
const dataHeroExcellenceValue = [
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

/* Data HeroReview */
const dataHeroReview = [
  {
    name: "Nur Aziezah",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    rating: 5,
    comment:
      "Layanan yang sangat baik dan produk berkualitas! Sangat merekomendasikan.",
  },
  {
    name: "Salma Fadhillah",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    rating: 4,
    comment:
      "Pengalaman yang luar biasa, meskipun pengirimannya bisa lebih cepat.",
  },
  {
    name: "Rizki Fauzan",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    rating: 5,
    comment: "Produk maklon yang luar biasa! Saya pasti akan membeli lagi.",
  },
];

/* Data HeroAddReview */
// const dataHeroAddReview = {
//   name: "Rizki Fauzan",
//   avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
// };
// const [rating, setRating] = useState(0);

// const handleStarClick = (index) => {
//   setRating(index + 1);
// };

export default function Welcome({ auth }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Head title="Home | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {" "}
        {/* HeaderHome */}
        <div className="relative h-[600px] w-full overflow-hidden md:h-[700px] lg:h-[900px]">
          {/* Background Image */}
          <img
            src={dataHeaderHome.imageUrl}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white lg:p-8">
            <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              {dataHeaderHome.title}
            </h1>
            <p className="mb-6 text-center text-base sm:text-lg md:text-xl lg:text-xl">
              {dataHeaderHome.description}
            </p>
            <button
              onClick={() => {
                window.location.href = data.whatsappLink;
              }}
              className="text-base-content rounded-lg bg-custom-yellow px-4 py-2 text-base font-semibold transition-colors hover:bg-yellow-400 sm:px-6 sm:py-3 sm:text-lg"
            >
              {dataHeaderHome.buttonText}
            </button>
          </div>
        </div>
        {/* HeroFlyer */}
        <div className="flex w-full items-center justify-center p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            {dataFlyer.map((dataFlyer, index) => (
              <div
                key={index}
                className="w-full overflow-hidden bg-white shadow-lg sm:w-[500px] md:w-[600px] lg:w-[800px]"
              >
                <img
                  src={dataFlyer.imageUrl}
                  loading="lazy"
                  alt={`Flyer ${index + 1}`}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {/* HeroCompany */}
        <div className="relative flex w-full flex-col items-center justify-center p-6 text-gray-800 lg:flex-row lg:p-12">
          <div className="mx-auto flex max-w-screen-xl flex-col items-center py-4 lg:flex-row lg:space-x-12">
            {/* imageUrl Section */}
            <div className="relative mb-8 flex justify-center lg:mb-0 lg:w-1/3">
              <div className="relative h-60 w-full overflow-hidden rounded-lg lg:h-full">
                <img
                  src={dataHeroCompany.imageUrl}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  alt="Company imageUrl"
                />
                <button
                  onClick={() => {
                    window.open(dataHeroCompany.youtubeLink);
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
                {dataHeroCompany.title}
              </h1>
              <p className="sm:text-md font-regular font-lexend text-base text-gray-600 lg:text-lg">
                {dataHeroCompany.description}
              </p>
            </div>
          </div>
        </div>
        {/* HeroWhyChoose */}
        <div className="mb-2 flex items-center justify-center py-12">
          <div className="w-full max-w-7xl p-6">
            <div className="hero-content flex flex-col lg:flex-row-reverse lg:items-start">
              <div className="order-2 flex w-full flex-col items-center lg:order-1 lg:ml-8 lg:w-1/2">
                {dataWhyChoose.imageUrl.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    loading="lazy"
                    className="mb-4 mt-4 w-full max-w-xl rounded-2xl object-cover sm:h-auto sm:w-auto lg:mt-12"
                    alt={`Image ${index + 1}`}
                  />
                ))}
              </div>
              <div className="order-1 w-full lg:order-2 lg:w-1/2">
                <h1 className="mb-4 max-w-xl text-left font-lexend text-4xl font-medium text-black sm:text-5xl">
                  Mengapa HARUS Memilih{" "}
                  <span className="font-bold">PT Ratu Bio Indonesia?</span>
                </h1>
                <h6 className="mb-8 rounded-xl bg-custom-yellow p-4 text-left font-lexend text-xl font-bold text-black sm:p-6 sm:text-xl">
                  {dataWhyChoose.subtitle}
                </h6>
                {dataWhyChoose.sections.map((section, index) => (
                  <div key={index}>
                    <h6 className="mb-2 text-left font-lexend text-xl font-medium text-black sm:text-2xl">
                      {section.heading}
                    </h6>
                    <p className="font-regular mb-8 text-left font-lexend text-sm text-gray-600 sm:text-lg">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* HeroMaklonValue */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-7xl p-4 sm:p-6">
            <h1 className="mx-auto mb-8 rounded-xl bg-custom-yellow p-4 text-center font-lexend text-2xl font-bold text-black sm:text-3xl md:text-4xl">
              {dataHeroMaklonValue.title}
            </h1>
            <div className="flex flex-col gap-8 lg:flex-row">
              {dataHeroMaklonValue.sections.map((section, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-center lg:w-1/2 lg:items-start"
                >
                  <img
                    src={section.images}
                    loading="lazy"
                    className="mb-4 w-full max-w-md rounded-2xl object-cover sm:max-w-lg md:max-w-xl"
                    alt={section.heading}
                  />
                  <h6 className="mb-2 text-center font-lexend text-xl font-medium text-black sm:text-2xl md:text-3xl lg:text-left">
                    {section.heading}
                  </h6>
                  <p className="font-regular mb-4 text-center font-lexend text-sm text-gray-600 sm:text-base md:text-lg lg:text-left">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* HeroFacilitiesValue */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-7xl p-4 sm:p-6">
            <h1 className="mx-auto mb-8 rounded-xl bg-custom-yellow p-4 text-center font-lexend text-2xl font-bold text-black sm:text-3xl md:text-4xl">
              {dataHeroFacilitiesValue.title}
            </h1>
            <div className="flex flex-col gap-8 lg:flex-row">
              {dataHeroFacilitiesValue.sections.map((section, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-center lg:w-1/2 lg:items-start"
                >
                  <img
                    loading="lazy"
                    src={section.images}
                    className="mb-4 w-full max-w-md rounded-2xl object-cover sm:max-w-lg md:max-w-xl"
                    alt={section.heading}
                  />
                  <h6 className="mb-2 text-center font-lexend text-xl font-medium text-black sm:text-2xl md:text-3xl lg:text-left">
                    {section.heading}
                  </h6>
                  <p className="font-regular mb-4 text-center font-lexend text-sm text-gray-600 sm:text-base md:text-lg lg:text-left">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* HeroCertificate */}
        <div className="flex w-full justify-center bg-white py-8 sm:py-10">
          <div className="flex w-full max-w-5xl flex-col items-center p-4 sm:p-6">
            <h1 className="mb-6 text-center font-lexend text-3xl font-medium text-black sm:mb-8 sm:text-4xl md:text-5xl">
              Certificate Approved
            </h1>
            <p className="mb-8 max-w-xl text-center font-lexend text-sm text-gray-600 sm:mb-10 md:text-base">
              Kualitas terbaik dari kami untuk Anda memiliki jaminan kualitas.
            </p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-14">
              {dataHeroCerfiticate.map((data, index) => (
                <div
                  key={index}
                  className="flex h-20 w-20 transform items-center justify-center overflow-hidden rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-105 sm:h-24 sm:w-24 md:h-28 md:w-28"
                >
                  <img
                    src={data.images}
                    loading="lazy"
                    alt={data.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* HeroService */}
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
            {dataHeroService.map((dataHeroService, index) => (
              <div
                key={index}
                className="flex max-w-xs transform flex-col items-center rounded-lg bg-white p-4 text-center text-custom-yellow shadow-lg transition-transform duration-300 hover:scale-105 sm:p-6"
                style={{ minHeight: "250px" }}
              >
                <div className="mb-4">
                  <dataHeroService.icon size="48" />
                </div>
                <h6 className="mb-2 font-lexend text-lg font-medium sm:text-xl">
                  {dataHeroService.title}
                </h6>
                <p className="font-lexend text-sm text-gray-600 sm:text-base">
                  {dataHeroService.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* HeroVideo */}
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
        {/* HeroHeroExcellenceValue */}
        <div className="flex flex-col items-center p-4 text-center sm:p-6">
          {" "}
          {/* Menambahkan text-center di container utama */}
          <h1 className="mb-4 font-lexend text-3xl font-semibold text-black md:mb-6 md:text-5xl">
            What Makes Us Different?
          </h1>
          <p className="mb-8 max-w-xl text-center font-lexend text-sm text-gray-600 sm:mb-10 md:text-base">
            Kami percaya bahwa kualitas dan dedikasi kami yang tak tergoyahkan
            terhadap kesuksesan klien menjadikan kami pilihan yang tepat untuk
            semua kebutuhan anda.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {dataHeroExcellenceValue.map((data, index) => (
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
        {/* HeroReview */}
        <div className="flex flex-col items-center p-4 sm:p-6">
          <h1 className="mb-4 font-lexend text-3xl font-semibold text-black md:mb-6 md:text-5xl">
            Reviews
          </h1>
          <p className="mb-8 max-w-xl text-center font-lexend text-sm text-gray-600 sm:mb-10 md:text-base">
            Kami yakin bahwa kepercayaan dan ulasan positif dari pelanggan
            adalah bukti nyata dari komitmen kami yang kuat terhadap kesuksesan
            klien. Dedikasi kami untuk memberikan layanan terbaik menjadikan
            kami mitra yang tepat untuk memenuhi semua kebutuhan Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {dataHeroReview.map((data, index) => (
              <div
                key={index}
                className="flex max-w-[85%] transform flex-col items-center rounded-lg bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:max-w-xs"
              >
                <Avatar
                  name={data.name}
                  src={data.avatar}
                  size="64"
                  round={true}
                  className="mb-4"
                />
                <h6 className="mb-1 font-lexend text-lg font-medium sm:mb-2 sm:text-xl">
                  {data.name}
                </h6>
                <div className="mb-2 flex">
                  {[...Array(data.rating)].map((star, i) => (
                    <FaStar key={i} className="text-custom-yellow" />
                  ))}
                </div>
                <p className="font-lexend text-xs text-gray-600 sm:text-sm">
                  {data.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* HeroAddReview */}
        <HeroAddReview />
      </main>
      <div className="absolute right-0 top-0 p-6 text-end">
        {/* {auth.user ? (
            <Link
              href={route("dashboard")}
              className="font-semibold text-gray-600 hover:text-gray-900 focus:rounded-sm focus:outline focus:outline-2 focus:outline-red-500 dark:text-gray-400 dark:hover:text-white"
            >
              Dashboard
            </Link>
          ) : (
            <div>
              <Link
                href={route("login")}
                className="font-semibold text-gray-600 hover:text-gray-900 focus:rounded-sm focus:outline focus:outline-2 focus:outline-red-500 dark:text-gray-400 dark:hover:text-white"
              >
                Log in
              </Link>
              <Link
                href={route("register")}
                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 focus:rounded-sm focus:outline focus:outline-2 focus:outline-red-500 dark:text-gray-400 dark:hover:text-white"
              >
                Register
              </Link>
            </div>
          )} */}
      </div>
    </div>
  );
}
