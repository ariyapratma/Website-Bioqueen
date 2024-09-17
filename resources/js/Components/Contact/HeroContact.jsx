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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 py-12 mt-2 mb-20">
        {/* Left Section - Dynamic Content */}
        {data.sections.map((section, index) => (
          <div key={index} className="w-full lg:w-2/3 text-left">
            <h1 className="text-3xl sm:text-4xl text-black font-lexend font-bold mb-4">
              {section.heading}
            </h1>
            <p className="text-lg text-gray-700 font-lexend mb-4">
              {section.content}{" "}
              <span className="text-lg text-custom-yellow px-2 font-lexend font-bold bg-black rounded-lg">
                Hubungi Kami.
              </span>
            </p>
            <div className="flex flex-col space-y-4 mb-6 pt-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <a
                  href="https://www.linkedin.com/company/ratubioindonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                >
                  <FaLinkedin size={32} />
                  <span className="text-lg font-lexend">LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/ratubioindonesia"
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-800"
                >
                  <FaInstagram size={32} />
                  <span className="text-lg font-lexend">Instagram</span>
                </a>
                <a
                  href="https://wa.me/6282162637186"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700"
                >
                  <FaWhatsapp size={32} />
                  <span className="text-lg font-lexend">082162637186</span>
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Right Section - Contact Form */}
        <div className="relative w-full lg:w-1/3 h-auto bg-white shadow-lg p-8 rounded-lg">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Input Your Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Input Your Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                placeholder="Input Your Message"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-custom-yellow text-black py-3 px-6 rounded-md font-semibold hover:bg-yellow-400 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
