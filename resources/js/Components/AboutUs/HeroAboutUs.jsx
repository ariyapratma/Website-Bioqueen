export default function HeroAboutUs() {
  const data = {
    sections: [
      {
        heading: "PT Ratu Bio Indonesia",
        description1:
          "PT Ratu Bio Indonesia adalah perusahaan swasta nasional yang bergerak di bidang pengolahan dan pemasaran bahan kimia, terutama sanitasi dan kebersihan, memproduksi hand sanitizer, disinfektan, sabun antiseptik, sabun cuci tangan, dan sabun khusus.",
        description2:
          "PT Ratu Bio Indonesia bekerja sama dengan Pusat Studi Surfaktan dan Bioenergi IPB dalam penelitian dan pengembangan formulasi produk. PT Ratu Bio Indonesia sejak berdiri pada Maret 2020 terus mengejar target di pertengahan tahun ini untuk memenuhi perizinan dan persyaratan sebagai pemasok dan pelaku usaha di bidang sanitasi dan higiene.",
        description3:
          "Pabrik PT Ratu Bio Indonesia menempati lahan seluas 7.000 m² milik sendiri, dengan fasilitas produksi dan laboratorium quality control untuk menghasilkan produk yang berkualitas. Selain memproduksi merek sendiri, Hi!giene, PT Ratu Bio Indonesia juga menerima jasa percetakan untuk produksi dan formulasi sabun cair, disinfektan, hand sanitizer, dan sabun cuci pelanggan.",
        imageUrl: "AboutUS/HeroAboutUs/HeroAboutUs.jpg",
      },
    ],
  };

  return (
    <div className="container mb-2 p-6 mx-auto px-4 py-8">
      {/* Content Section */}
      <div className="flex flex-col lg:flex-row overflow-hidden w-full">
        {data.sections.map((section, index) => (
          <div key={index} className="flex flex-col lg:flex-row w-full">
            {/* Text Section */}
            <div className="p-6 flex flex-col lg:w-1/2">
              <h1 className="text-3xl sm:text-4xl text-black font-lexend font-bold mb-4">
                {section.heading}
              </h1>
              <p className="text-gray-600 font-lexend font-medium mb-4">
                {section.description1}
              </p>
              <p className="text-gray-600 font-lexend font-medium mb-4">
                {section.description2}
              </p>
              <p className="text-gray-600 font-lexend font-medium">
                {section.description3}
              </p>
            </div>
            {/* Image Section */}
            <div className="lg:w-1/2 flex justify-center items-center">
              <img
                src={section.imageUrl}
                loading="lazy"
                alt="Company PT Ratu Bio Indonesia"
                className="w-full max-w-lg h-auto object-cover rounded-lg lg:max-h-[600px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
