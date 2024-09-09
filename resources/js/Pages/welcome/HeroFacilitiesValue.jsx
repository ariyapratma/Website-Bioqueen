export default function HeroFacilitiesValue() {
  const data = {
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
  );
}
