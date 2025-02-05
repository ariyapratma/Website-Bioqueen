export default function HeaderHome() {
  const data = {
    title: "Jasa Maklon Sanitasi dan Higiene",
    description: "Mau Buat Brand Sabun Kamu Sendiri?",
    buttonText: "Konsultasikan Sekarang",
    imageUrl: "/Home/HeaderHome/HeaderHome.jpg",
    whatsappLink: "https://wa.me/6282162637186",
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden md:h-[700px] lg:h-[900px]">
      {/* Background Image */}
      <img
        src={data.imageUrl}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white lg:p-8">
        <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          {data.title}
        </h1>
        <p className="mb-6 text-center text-base sm:text-lg md:text-xl lg:text-xl">
          {data.description}
        </p>
        <button
          onClick={() => {
            window.location.href = data.whatsappLink;
          }}
          className="text-base-content rounded-lg bg-custom-yellow px-4 py-2 text-base font-semibold transition-colors hover:bg-yellow-400 sm:px-6 sm:py-3 sm:text-lg"
        >
          {data.buttonText}
        </button>
      </div>
    </div>
  );
}
