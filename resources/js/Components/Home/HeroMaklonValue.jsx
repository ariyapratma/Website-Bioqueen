export default function HeroMaklonValue() {
  const data = {
    title: "Maklon Harga Rendah dengan Kualitas Mewah",
    sections: [
      {
        heading: "Harga Bersaing",
        content:
          "Kami dapat menyesuaikan anggaran produk makion Anda, mulai dari bahan baku hingga kemasan, dengan biaya yang fleksibel dan dapat disepakati bersama, sehingga memudahkan Anda memulai bisnis produk home care, cleaning, dan aromaterapi.",
        images: "/Home/HeroMaklonValue/HeroMaklonValue1.jpg",
      },
      {
        heading: "Jaminan Aman dan Berkualitas",
        content:
          "Produk maklon kami diproduksi dengan standar Kemenkes RI untuk memastikan keamanan dan kualitasnya. Kami menyediakan berbagai pilihan bahan baku dan kemasan dengan anggaran yang fleksibel dan dapat disesuaikan, membantu Anda memulai bisnis produk home care, cleaning, dan aromaterapi dengan percaya diri",
        images: "/Home/HeroMaklonValue/HeroMaklonValue2.jpg",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-7xl p-4 sm:p-6">
        <h1 className="mx-auto mb-8 rounded-xl bg-custom-yellow p-4 text-center font-lexend text-2xl font-bold text-black sm:text-3xl md:text-4xl">
          {data.title}
        </h1>
        <div className="flex flex-col gap-8 lg:flex-row">
          {data.sections.map((section, index) => (
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
  );
}
