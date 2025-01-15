import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

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

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "6282162637186";
    const whatsappMessage = `Halo PT Ratu Bio Indonesia, saya ${formData.name}.\nSaya tertarik untuk konsultasi terkait layanan maklon.\n\nBerikut informasi saya:\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan: "${formData.message}".\n\nTerima kasih.`;

    // Redirect to WhatsApp
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;
    window.open(whatsappLink, "_blank");
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
        <div className="relative h-auto w-full rounded-lg border-gray-200 bg-white p-8 shadow-lg lg:w-1/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Input Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Input Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Input Your Message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-0"
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
