export default function HeaderProduct() {
  const data = {
    title: "Product",
    description:
      "Jelajahi perjalanan produk Anda dari awal hingga siap dipasarkan. Kami memastikan setiap langkah produksi berjalan dengan kualitas terbaik, menghadirkan produk yang memenuhi standar tinggi dan kebutuhan pasar.",
    imageUrl: "/public/Maklon Main Content Fix.jpg",
  };

  return (
    <div className="relative w-full h-[30rem] overflow-hidden">
      {/* Hero Image */}
      <img
        src={data.imageUrl}
        loading="lazy"
        className="w-full h-full object-cover"
        alt="Header Product"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-36 xl:px-48 bg-black bg-opacity-40 pt-6">
        <h2 className="text-5xl text-white font-lexend font-bold mb-4 pt-40">
          {data.title}
        </h2>
        <p className="text-md text-white font-lexend font-bold max-w-md">
          {data.description}
        </p>
      </div>
    </div>
  );
}
