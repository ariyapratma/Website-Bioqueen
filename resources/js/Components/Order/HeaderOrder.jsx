export default function HeaderOrder() {
  const data = {
    title: "Order",
    description:
      "Mulailah perjalanan produk Anda dari pemesanan hingga siap dipasarkan. Kami memastikan setiap langkah produksi berjalan dengan kualitas terbaik, menghasilkan produk yang memenuhi standar tinggi dan kebutuhan pasar.",
    imageUrl: "/Maklon Main Content Fix.jpg",
  };

  return (
    <div className="relative w-full h-[30rem] overflow-hidden">
      {/* Hero Image */}
      <img
        src={data.imageUrl}
        loading="lazy"
        className="w-full h-full object-cover"
        alt="Header Order"
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
