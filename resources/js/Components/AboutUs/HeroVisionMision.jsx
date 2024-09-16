export default function HeroVisionMision() {
  const data = {
    sections: [
      {
        heading: "Visi & Misi",
        description1:
          "Meraih rasa cinta dan penghargaan dari seluruh dunia dengan memberikan solusi di bidang Home Care, Cleaning dan Aromaterapi.",
        description2: [
          "1. Berinovasi secara kontinyu untuk memenuhi kebutuhan konsumen.",
          "2. Membangun team yang profesional dan berakhakul kharimah.",
          "3. Orientasi pada efisiensi, efektivitas, dan produktivitas sehingga menghasilkan kinerja yang di atas rata-rata.",
          "4. Berfokus pada peningkatan value-added dengan standar kualitas tinggi.",
          "5. Tumbuh bersama partner untuk mutual benefit.",
          "6. Mengurangi dampak terhadap lingkungan dan meningkatkan manfaat sosial.",
        ],
        imageUrl: "AboutUs/HeroVisionMision/HeroVisionMision.jpeg",
      },
    ],
  };

  return (
    <div className="container mx-auto mb-2 p-6 px-4 py-8">
      {/* Content Section */}
      <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white lg:flex-row">
        {data.sections.map((section, index) => (
          <div key={index} className="flex w-full flex-col lg:flex-row">
            {/* Text Section */}
            <div className="flex flex-col p-6 lg:w-1/2">
              <h1 className="mb-4 font-lexend text-3xl font-bold text-black sm:text-4xl">
                {section.heading}
              </h1>
              <p className="mb-4 font-lexend font-medium text-gray-600">
                {section.description1}
              </p>
              <div className="space-y-2 font-lexend font-medium text-gray-600">
                {section.description2.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
            {/* Image Section */}
            <div className="flex items-center justify-center lg:w-1/2">
              <img
                src={section.imageUrl}
                loading="lazy"
                alt="Visi Misi"
                className="h-auto w-full max-w-lg rounded-lg object-cover lg:max-h-[600px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
