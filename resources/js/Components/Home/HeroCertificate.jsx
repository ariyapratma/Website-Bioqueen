export default function HeroCertificate() {
    const data = [
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
  
    return (
      <div className="bg-white w-full flex justify-center py-8 sm:py-10">
        <div className="flex flex-col items-center w-full max-w-5xl p-4 sm:p-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-black font-lexend font-medium mb-6 sm:mb-8 text-center">
            Certificate Approved
          </h1>
          <p className="text-center text-sm md:text-base font-lexend text-gray-600 mb-8 sm:mb-10 max-w-xl">
            Kualitas terbaik dari kami untuk Anda memiliki jaminan kualitas.
          </p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-14">
            {data.map((data, index) => (
              <div
                key={index}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg flex items-center justify-center bg-white transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={data.images}
                  loading="lazy"
                  alt={data.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  