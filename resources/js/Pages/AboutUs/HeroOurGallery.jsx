import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroOurGallery = () => {
  const { props } = usePage();
  const { dataHeroOurGallery } = props;

  return (
    <div className="mx-auto mb-24 px-6 py-4">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 font-lexend text-4xl font-bold text-black lg:text-5xl">
          {dataHeroOurGallery?.title || "No title available."}
        </h1>
        <p className="mb-10 font-lexend text-lg text-gray-500">
          {dataHeroOurGallery?.subtitle || "No subtitle available."}
        </p>

        {/* Grid untuk menampilkan gambar secara terpisah */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Image 1 */}
          {dataHeroOurGallery?.image_url1 ? (
            <motion.div
              className="group relative overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={dataHeroOurGallery.image_url1}
                loading="lazy"
                alt="Our Gallery"
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-lexend text-xl font-semibold text-white">
                    {dataHeroOurGallery?.title_image_url1 ||
                      "No title image available."}
                  </h3>
                </div>
              </div>
            </motion.div>
          ) : (
            <p className="font-lexend font-medium text-red-500">
              No image available.
            </p>
          )}

          {/* Image 2 */}
          {dataHeroOurGallery?.image_url2 ? (
            <motion.div
              className="group relative overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={dataHeroOurGallery.image_url2}
                loading="lazy"
                alt="Our Gallery"
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-lexend text-xl font-semibold text-white">
                    {dataHeroOurGallery?.title_image_url2 ||
                      "No title image available."}
                  </h3>
                </div>
              </div>
            </motion.div>
          ) : (
            <p className="font-lexend font-medium text-red-500">
              No image available.
            </p>
          )}

          {/* Image 3 */}
          {dataHeroOurGallery?.image_url3 ? (
            <motion.div
              className="group relative overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={dataHeroOurGallery.image_url3}
                loading="lazy"
                alt="Our Gallery"
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-lexend text-xl font-semibold text-white">
                    {dataHeroOurGallery?.title_image_url3 ||
                      "No title image available."}
                  </h3>
                </div>
              </div>
            </motion.div>
          ) : (
            <p className="font-lexend font-medium text-red-500">
              No image available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroOurGallery;
