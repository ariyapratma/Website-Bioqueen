import Avatar from "react-avatar";
import { FaStar } from "react-icons/fa";

const data = [
  {
    name: "Nur Aziezah",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    rating: 5,
    comment:
      "Layanan yang sangat baik dan produk berkualitas! Sangat merekomendasikan.",
  },
  {
    name: "Salma Fadhillah",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    rating: 4,
    comment:
      "Pengalaman yang luar biasa, meskipun pengirimannya bisa lebih cepat.",
  },
  {
    name: "Rizki Fauzan",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    rating: 5,
    comment: "Produk maklon yang luar biasa! Saya pasti akan membeli lagi.",
  },
];

export default function HeroReview() {
  return (
    <div className="flex flex-col items-center p-4 sm:p-6">
      <h1 className="text-3xl md:text-5xl text-black font-lexend font-semibold mb-4 md:mb-6">
        Reviews
      </h1>
      <p className="text-center text-sm md:text-base font-lexend text-gray-600 mb-8 sm:mb-10 max-w-xl">
        Kami yakin bahwa kepercayaan dan ulasan positif dari pelanggan adalah
        bukti nyata dari komitmen kami yang kuat terhadap kesuksesan klien.
        Dedikasi kami untuk memberikan layanan terbaik menjadikan kami mitra
        yang tepat untuk memenuhi semua kebutuhan Anda.
      </p>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {data.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 max-w-[85%] sm:max-w-xs bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105"
          >
            <Avatar
              name={data.name}
              src={data.avatar}
              size="64"
              round={true}
              className="mb-4"
            />
            <h6 className="text-lg sm:text-xl font-lexend font-medium mb-1 sm:mb-2">
              {data.name}
            </h6>
            <div className="flex mb-2">
              {[...Array(data.rating)].map((star, i) => (
                <FaStar key={i} className="text-custom-yellow" />
              ))}
            </div>
            <p className="text-xs sm:text-sm font-lexend text-gray-600">
              {data.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
