export default function HeaderHome() {
    const data = {
      title: "Jasa Maklon Sanitasi dan Higiene",
      description: "Mau Buat Brand Sabun, Kosmetik Dan Skincare Kamu Sendiri?",
      buttonText: "Konsultasikan Sekarang",
      imageUrl: "/Home/HeaderHome/HeaderHome.jpg",
      whatsappLink: "https://wa.me/6282162637186",
    };
  
    return (
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[900px] overflow-hidden">
        {/* Background Image */}
        <img
          src={data.imageUrl}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 lg:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
            {data.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-xl mb-6 text-center">
            {data.description}
          </p>
          <button
            onClick={() => {
              window.location.href = data.whatsappLink;
            }}
            className="bg-custom-yellow text-base-content px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            {data.buttonText}
          </button>
        </div>
      </div>
    );
  }
  