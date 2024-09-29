import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const data = [
  {
    title: "Certificate 1",
    imageUrl: "/HomeAsset/HeroCertificate/Certificate1.png",
  },
  {
    title: "Certificate 2",
    imageUrl: "/HomeAsset/HeroCertificate/Certificate2.png",
  },
  {
    title: "Certificate 3",
    imageUrl: "/HomeAsset/HeroCertificate/Certificate3.png",
  },
  {
    title: "Certificate 4",
    imageUrl: "/HomeAsset/HeroCertificate/Certificate4.png",
  },
  {
    title: "Certificate 5",
    imageUrl: "/HomeAsset/HeroCertificate/Certificate5.png",
  },
];

export default function Footer() {
  return (
    <footer className="text-base-content bg-gray-100 py-10">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-5 sm:grid-cols-2 md:grid-cols-3 md:px-20">
        {/* Section 1: PT Ratu Bio Indonesia */}
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <img
            src="/FooterLogo/FooterLogo.png"
            loading="lazy"
            alt="PT Ratu Bio Indonesia Logo"
            className="mb-4 h-auto w-24"
          />
          <h6 className="text-center font-lexend text-lg font-bold md:text-left">
            PT Ratu Bio Indonesia
          </h6>
          <p className="font-regular text-center font-lexend text-sm md:text-left">
            PT Ratu Bio Indonesia is a national private company engaged in the
            processing and marketing of chemicals, especially sanitation and
            hygiene, producing hand sanitizers, disinfectants, antiseptic soaps,
            hand soaps, and specialty soaps.
          </p>
          <h6 className="text-md mt-4 text-center font-lexend font-bold md:text-left">
            Address
          </h6>
          <p className="font-regular text-center font-lexend text-sm md:text-left">
            Jl. Barokah II, RT 03 RW 10, Kp Parungdengdek, Wanaherang, Kec. Gn.
            Putri, Kabupaten Bogor, Jawa Barat 16965
          </p>
          <h6 className="text-md mt-4 text-center font-lexend font-bold md:text-left">
            Product
          </h6>
          <p className="font-regular text-center font-lexend text-sm md:text-left">
            Hand sanitizers, disinfectants, antiseptic soaps, hand soaps, and
            specialty soaps.
          </p>
        </div>

        {/* Section 2: Contact Information and Connect With Us */}
        <div className="flex flex-col items-center space-y-6">
          <div className="space-y-4 text-center">
            <h6 className="font-lexend text-lg font-bold">Contact Us</h6>
            <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <FaWhatsapp className="text-green-600" />
                <a
                  href="https://wa.me/6282162637186"
                  className="font-lexend text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  082162637186
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-red-600" />
                <a
                  href="mailto:ratubioindonesia@gmail.com"
                  className="font-lexend text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  ratubioindonesia@gmail.com
                </a>
              </div>
            </div>
            <h6 className="mt-6 font-lexend text-lg font-bold">
              Connect With Us!
            </h6>
            <div className="flex justify-center space-x-3">
              <a
                href="https://www.linkedin.com/company/ratubioindonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/ratubioindonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com/ratubioindo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <FaTwitter size={24} />
              </a>
            </div>
            {/* Helps Section */}
            <h6 className="mt-6 font-lexend text-lg font-bold">Helps</h6>
            <div className="flex flex-col space-y-2">
              <a
                href="/about"
                className="font-lexend text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="font-lexend text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Contact
              </a>
              <a
                href="/maklon"
                className="font-lexend text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Maklon
              </a>
            </div>
          </div>
        </div>

        {/* Section 3: Certificates and Map */}
        <div className="flex flex-col items-center space-y-4">
          <h6 className="text-center font-lexend text-lg font-bold">
            Certificates
          </h6>
          <div className="flex flex-wrap justify-center space-x-4">
            {data.map((certificate) => (
              <img
                key={certificate.title}
                src={certificate.imageUrl}
                loading="lazy"
                alt={certificate.title}
                className="mb-4 h-auto w-16 rounded-lg shadow-sm"
              />
            ))}
          </div>

          <h6 className="mt-6 text-center font-lexend text-lg font-bold">
            Our Location
          </h6>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7087547334436!2d106.94036697504879!3d-6.431447062893221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69953d49a2eb17%3A0x7974d83d2855f518!2sPT%20Ratu%20Bio%20Indonesia!5e0!3m2!1sid!2sid!4v1722768534496!5m2!1sid!2sid"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-4 rounded-lg"
          ></iframe>
        </div>
      </div>

      <div className="container mx-auto mt-10 px-5 md:px-20">
        <div className="flex justify-center">
          <p className="font-regular font-lexend text-sm">
            © 2024 PT Ratu Bio Indonesia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
