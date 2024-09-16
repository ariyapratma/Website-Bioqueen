export default function HeroOurLegal() {
  const data = [
    {
      imageUrl: "Home/HeroCertificate/Certificate1.png",
    },
    {
      imageUrl: "Home/HeroCertificate/Certificate2.png",
    },
    {
      imageUrl: "Home/HeroCertificate/Certificate3.png",
    },
    {
      imageUrl: "Home/HeroCertificate/Certificate4.png",
    },
    {
      imageUrl: "Home/HeroCertificate/Certificate5.png",
    },
  ];

  return (
    <div className="bg-gray-100 p-6 sm:p-8 lg:p-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8">
          {data.map((data, index) => (
            <div
              key={index}
              className="relative flex h-24 w-full transform items-center justify-center rounded-xl bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg sm:h-32 sm:w-32 lg:h-40 lg:w-40"
            >
              <img
                src={data.imageUrl}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
                alt={`Legal Certificate ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
