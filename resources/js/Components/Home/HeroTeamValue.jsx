export default function HeroTeamValue() {
  const data = {
    title: "Mengapa Harus Memilih",
    subtitle: "Tim Ahli yang Inovatif",
    sections: [
      {
        heading: "Tim Riset Profesional",
        content:
          "Memiliki tim riset ahli dan profesional di industri kimia untuk membuat produk kosmetik yang inovatif. Menjamin keamanan produk yang dihasilkan dengan uji laboraturium sesuai dengan standart.",
      },
      {
        heading: "Kontrol Kualitas yang Ketat",
        content:
          "Memiliki tim QC khusus yang bertugas memantau seluruh proses produksi dan memastikan seluruh proses dilakukan sesuai dengan standar Cara Pembuatan Kosmetik yang Baik (CPKB).",
      },
    ],
    images: [
      "public/Home/HeroTeamValue/HeroTeamValue1.jpg",
      "public/Home/HeroTeamValue/HeroTeamValue2.jpg",
    ],
  };

  return (
    <div className="mb-2 flex items-center justify-center">
      <div className="w-full max-w-7xl p-6">
        <div className="hero-content flex flex-col lg:flex-row-reverse lg:items-start">
          <div className="order-2 flex w-full flex-col items-center lg:order-1 lg:ml-8 lg:w-1/2">
            {data.images.map((src, index) => (
              <img
                key={index}
                src={src}
                loading="lazy"
                className="mb-4 mt-4 w-full max-w-xl rounded-2xl object-cover sm:h-auto sm:w-auto lg:mt-12"
                alt={`Image ${index + 1}`}
              />
            ))}
          </div>
          <div className="order-1 w-full lg:order-2 lg:w-1/2">
            <h1 className="mb-4 max-w-xl text-left font-lexend text-4xl font-medium text-black sm:text-5xl">
              Mengapa HARUS Memilih{" "}
              <span className="font-bold">PT Ratu Bio Indonesia?</span>
            </h1>
            <h6 className="mb-8 rounded-xl bg-custom-yellow p-4 text-left font-lexend text-xl font-bold text-black sm:p-6 sm:text-xl">
              {data.subtitle}
            </h6>
            {data.sections.map((section, index) => (
              <div key={index}>
                <h6 className="mb-2 text-left font-lexend text-xl font-medium text-black sm:text-2xl">
                  {section.heading}
                </h6>
                <p className="font-regular mb-8 text-left font-lexend text-sm text-gray-600 sm:text-lg">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
