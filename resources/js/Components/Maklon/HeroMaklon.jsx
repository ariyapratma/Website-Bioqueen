import {
  FaHeadset,
  FaCubes,
  FaFlask,
  FaThumbsUp,
  FaHandshake,
  FaMoneyBillWave,
  FaFileSignature,
  FaDollyFlatbed,
  FaCheckSquare,
  FaShippingFast,
} from "react-icons/fa";

export default function HeroMaklon() {
  const data = {
    sections: [
      {
        heading: "Konsultasi Produk",
        content:
          "Kami menyediakan layanan konsultasi produk untuk membantu Anda mengembangkan solusi yang sesuai dengan kebutuhan dan tujuan bisnis Anda. Tim ahli kami akan memberikan panduan dalam merancang, memformulasikan, dan mengoptimalkan produk, memastikan bahwa setiap aspek dari konsep hingga peluncuran memenuhi standar kualitas dan pasar yang diinginkan.",
        duration: "Berkelanjutan",
        icon: FaHeadset,
      },
      {
        heading: "Penentuan Fungsi & Formulasi Produk",
        content:
          "Kami akan bekerja sama dengan Anda untuk menentukan fungsi utama dan formulasi produk sesuai dengan kebutuhan spesifik Anda. Proses ini melibatkan analisis mendalam untuk mengidentifikasi fitur yang diinginkan dan mengembangkan formulasi yang optimal, memastikan produk akhir memenuhi standar kualitas dan performa yang diharapkan.",
        duration: "Berkelanjutan",
        icon: FaCubes,
      },
      {
        heading: "Pembuatan Sample",
        content:
          "Kami akan membuat sampel produk berdasarkan desain dan formulasi yang telah disepakati. Proses ini mencakup pengembangan prototipe awal untuk evaluasi dan pengujian. Sampel ini akan digunakan untuk memastikan bahwa produk memenuhi spesifikasi yang diinginkan sebelum melanjutkan ke produksi massal.",
        duration: "Berkelanjutan",
        icon: FaFlask,
      },
      {
        heading: "Konfirmasi Produk & Finalisasi Teknis",
        content:
          "Kami akan mengonfirmasi semua aspek produk, termasuk desain dan formulasi yang telah disepakati. Tim RnD kami akan melakukan finalisasi teknis melalui uji laboratorium untuk memastikan produk siap diproduksi secara massal dengan standar kualitas dan keamanan yang telah ditetapkan.",
        duration: "Berkelanjutan",
        icon: FaThumbsUp,
      },
      {
        heading: "Pembuatan MOU Kerjasama",
        content:
          "Kami akan menyusun Memorandum of Understanding (MOU) untuk mengatur seluruh aspek kerjasama, termasuk hak dan kewajiban masing-masing pihak, timeline produksi, serta detail teknis lainnya. MOU ini memastikan bahwa semua pihak memiliki pemahaman yang jelas dan kesepakatan yang kuat sebelum melangkah ke tahap produksi.",
        duration: "Berkelanjutan",
        icon: FaHandshake,
      },
      {
        heading: "Pembayaran Biaya Maklon",
        content:
          "Setelah semua persyaratan teknis dan administratif terpenuhi, kami akan mengatur pembayaran biaya maklon sesuai dengan kesepakatan. Pembayaran ini mencakup biaya produksi, uji laboratorium, dan layanan terkait lainnya, sebagai langkah terakhir sebelum memulai proses produksi massal.",
        duration: "Berkelanjutan",
        icon: FaMoneyBillWave,
      },
      {
        heading: "Penyiapan Dokumen Pengurusan Izin Edar",
        content:
          "Kami akan membantu Anda dalam menyiapkan semua dokumen yang diperlukan untuk pengurusan izin edar produk. Proses ini mencakup penyusunan dokumen teknis, sertifikasi, dan kelengkapan administrasi lainnya untuk memastikan produk Anda memenuhi persyaratan regulasi dan siap dipasarkan.",
        duration: "Berkelanjutan",
        icon: FaFileSignature,
      },
      {
        heading: "Produksi",
        content:
          "Setelah semua persiapan selesai, kami akan memulai proses produksi sesuai dengan spesifikasi yang telah disepakati. Dengan didukung oleh fasilitas produksi yang canggih dan tim berpengalaman, kami memastikan setiap tahap produksi berjalan dengan efisien, menghasilkan produk berkualitas tinggi yang siap untuk didistribusikan.",
        duration: "Berkelanjutan",
        icon: FaDollyFlatbed,
      },
      {
        heading: "Quality Control (QC)",
        content:
          "Kami menerapkan standar Quality Control (QC) yang ketat untuk memastikan setiap produk memenuhi persyaratan kualitas yang tinggi. Proses QC kami melibatkan pemeriksaan menyeluruh pada setiap tahap produksi, mulai dari bahan baku hingga produk akhir, untuk memastikan konsistensi, keamanan, dan performa produk sesuai dengan spesifikasi yang telah ditetapkan.",
        duration: "Berkelanjutan",
        icon: FaCheckSquare,
      },
      {
        heading: "Pengiriman Ke Konsumen",
        content:
          "Setelah proses produksi selesai, kami akan mengatur pengiriman produk langsung kepada konsumen. Kami memastikan bahwa produk dikemas dengan baik dan dikirimkan tepat waktu, menggunakan metode pengiriman yang aman dan efisien, untuk memastikan kepuasan pelanggan dan kualitas produk tetap terjaga sampai ke tangan konsumen.",
        duration: "Berkelanjutan",
        icon: FaShippingFast,
      },
    ],
  };

  return (
    <div className="container mx-auto px-2 py-2">
      {/* Content Section */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.sections.map((section, index) => (
              <div
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <section.icon className="w-10 h-10 text-custom-yellow" />
                  <h3 className="text-lg sm:text-xl font-medium font-lexend ml-4">
                    {section.heading}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 font-lexend mb-4 flex-1">
                  {section.content}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 font-lexend">
                  Durasi: {section.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
