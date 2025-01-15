import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function HeroContact() {
  const data = {
    sections: [
      {
        heading: "Let's Talk With Us",
        content:
          "Sudah Punya Brand & Develop Produk? Atau Belum Punya Brand, Ingin Mulai Maklon?",
      },
    ],
  };

  return (
    <div className="container mx-auto mb-2 p-6 px-10 py-0">
      <div className="mb-20 mt-2 flex flex-col items-start justify-center gap-8 py-12 lg:flex-row">
        {/* Left Section - Dynamic Content */}
        {data.sections.map((section, index) => (
          <div key={index} className="w-full text-left lg:w-2/3">
            <h1 className="mb-4 font-lexend text-3xl font-bold text-black sm:text-4xl">
              {section.heading}
            </h1>
            <p className="mb-4 font-lexend text-lg text-gray-700">
              {section.content}{" "}
              <span className="rounded-lg bg-black px-2 font-lexend text-lg font-bold text-custom-yellow">
                Hubungi Kami.
              </span>
            </p>
            <div className="mb-6 flex flex-col space-y-4 pt-4">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://www.linkedin.com/company/ratubioindonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                >
                  <FaLinkedin size={32} />
                  <span className="font-lexend text-lg">LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/ratubioindonesia"
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-800"
                >
                  <FaInstagram size={32} />
                  <span className="font-lexend text-lg">Instagram</span>
                </a>
                <a
                  href="https://wa.me/6282162637186"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700"
                >
                  <FaWhatsapp size={32} />
                  <span className="font-lexend text-lg">082162637186</span>
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Right Section - Contact Form */}
        <div className="relative h-auto w-full rounded-lg bg-white p-8 shadow-lg lg:w-1/3">
          <form>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Input Your Name"
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-custom-yellow"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Input Your Email"
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-custom-yellow"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Message
              </label>
              <textarea
                placeholder="Input Your Message"
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-custom-yellow"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-custom-yellow px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-400"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
