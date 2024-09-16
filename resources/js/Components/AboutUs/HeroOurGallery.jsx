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
    <div className="py-4 px-6 mx-auto">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl lg:text-5xl text-black font-lexend font-bold mb-6">
          Our Gallery
        </h1>
        <p className="text-lg text-gray-500 font-lexend mb-10">
          Aktivitas Kami
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((data, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={data.imageUrl}
                loading="lazy"
                alt={data.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl text-white font-lexend font-semibold">
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
