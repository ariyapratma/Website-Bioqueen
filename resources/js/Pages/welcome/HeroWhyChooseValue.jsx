export default function HeroWhyChooseValue() {
    const whychoose = {
      title: "Mengapa HARUS Memilih PT Ratu Bio Indonesia?",
      subtitle: "Menyesuaikan Kebutuhan Pelanggan",
      sections: [
        {
          heading: "Kustom Produk",
          content:
            "Kami bisa mewujudkan produk kosmetik impian Anda dengan aneka macam bahan aktif, warna, aroma, kemasan yang selalu mengikuti tren pasar kosmetik dengan berstandar CPKB Grade A dan BPOM.",
        },
        {
          heading: "Minimum Kuantiti Pemesanan Bervariasi",
          content:
            "Jumlah minimum pemesanan dapat dipilih sesuai keinginan berdasarkan paket yang tersedia sehingga bisa menyesuaikan anggaran Anda.",
        },
      ],
      imageUrl: [
        "/Home/HeroWhyChooseValue/HeroWhyChoose1.jpg",
        "/Home/HeroWhyChooseValue/HeroWhyChoose2.jpg",
      ],
    };
  
    return (
      <div className="py-12 flex justify-center items-center mb-2">
        <div className="p-6 w-full max-w-7xl">
          <div className="hero-content flex flex-col lg:flex-row-reverse lg:items-start">
            <div className="w-full lg:w-1/2 lg:ml-8 flex flex-col items-center order-2 lg:order-1">
              {whychoose.imageUrl.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  loading="lazy"
                  className="w-full sm:w-auto sm:h-auto max-w-xl rounded-2xl object-cover mb-4 mt-4 lg:mt-12"
                  alt={`Image ${index + 1}`}
                />
              ))}
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <h1 className="text-4xl sm:text-5xl text-black font-lexend font-medium max-w-xl mb-4 text-left">
                Mengapa HARUS Memilih{" "}
                <span className="font-bold">PT Ratu Bio Indonesia?</span>
              </h1>
              <h6 className="text-xl sm:text-xl text-black font-lexend font-bold mb-8 bg-custom-yellow rounded-xl text-left p-4 sm:p-6">
                {whychoose.subtitle}
              </h6>
              {whychoose.sections.map((section, index) => (
                <div key={index}>
                  <h6 className="text-xl sm:text-2xl text-black font-lexend font-medium mb-2 text-left">
                    {section.heading}
                  </h6>
                  <p className="text-sm sm:text-lg text-gray-600 font-lexend font-regular mb-8 text-left">
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
  