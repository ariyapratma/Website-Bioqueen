import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroOurGallery() {
  const data = [
    {
      title: "Production Team",
      imageUrl: "AboutUs/HeroOurGallery/HeroOurGallery1.jpg",
    },
    {
      title: "Production Team",
      imageUrl: "AboutUs/HeroOurGallery/HeroOurGallery2.jpg",
    },
    {
      title: "Laboratory Team",
      imageUrl: "AboutUs/HeroOurGallery/HeroOurGallery3.jpg",
    },
  ];

  return (
    <div className="mx-auto px-6 py-4">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 font-lexend text-4xl font-bold text-black lg:text-5xl">
          Our Gallery
        </h1>
        <p className="mb-10 font-lexend text-lg text-gray-500">
          Aktivitas Kami
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((data, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={data.imageUrl}
                loading="lazy"
                alt={data.title}
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-lexend text-xl font-semibold text-white">
                    {data.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
