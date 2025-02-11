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
    <footer className="bg-custom-yellow py-12 text-gray-700">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-5 sm:grid-cols-2 md:grid-cols-4 md:px-10 lg:px-20">
        {/* Section 1: Company Info */}
        <div className="flex flex-col space-y-4">
          <img
            src="/FooterLogo/FooterLogo.png"
            loading="lazy"
            alt="PT Ratu Bio Indonesia Logo"
            className="h-20 w-auto object-contain"
          />
          <h6 className="text-lg font-bold">PT Ratu Bio Indonesia</h6>
          <p className="text-sm leading-relaxed">
            PT Ratu Bio Indonesia is a national private company engaged in the
            processing and marketing of chemicals, especially sanitation and
            hygiene, producing hand sanitizers, disinfectants, antiseptic soaps,
            hand soaps, and specialty soaps.
          </p>
        </div>

        {/* Section 2: Address and Products */}
        <div className="flex flex-col space-y-4">
          <h6 className="text-lg font-bold">Address</h6>
          <p className="text-sm leading-relaxed">
            Jl. Barokah II, RT 03 RW 10, Kp Parungdengdek, Wanaherang, Kec. Gn.
            Putri, Kabupaten Bogor, Jawa Barat 16965
          </p>
          <h6 className="text-lg font-bold">Products</h6>
          <p className="text-sm leading-relaxed">
            Hand sanitizers, disinfectants, antiseptic soaps, hand soaps, and
            specialty soaps.
          </p>
        </div>

        {/* Section 3: Contact and Social Media */}
        <div className="flex flex-col space-y-4">
          <h6 className="text-lg font-bold">Contact Us</h6>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaWhatsapp className="text-green-600" />
              <a
                href="https://wa.me/6282162637186"
                className="text-sm hover:text-gray-900"
              >
                082162637186
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-red-600" />
              <a
                href="mailto:ratubioindonesia@gmail.com"
                className="text-sm hover:text-gray-900"
              >
                ratubioindonesia@gmail.com
              </a>
            </div>
          </div>

          <h6 className="text-lg font-bold">Connect With Us</h6>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/company/ratubioindonesia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/ratubioindonesia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800 transition-colors duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com/ratubioindo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Section 4: Certificates and Map */}
        <div className="flex flex-col space-y-4">
          <h6 className="text-lg font-bold">Certificates</h6>
          <div className="grid grid-cols-3 gap-2">
            {data.map((certificate) => (
              <div
                key={certificate.title}
                className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={certificate.imageUrl}
                  loading="lazy"
                  alt={certificate.title}
                  className="h-24 w-full object-cover"
                />
              </div>
            ))}
          </div>

          <h6 className="text-lg font-bold">Our Location</h6>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7087547334436!2d106.94036697504879!3d-6.431447062893221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69953d49a2eb17%3A0x7974d83d2855f518!2sPT%20Ratu%20Bio%20Indonesia!5e0!3m2!1sid!2sid!4v1722768534496!5m2!1sid!2sid"
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10 pt-6">
        <div className="container mx-auto px-5 text-center md:px-10 lg:px-20">
          <p className="text-sm">
            © 2024 PT Ratu Bio Indonesia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}