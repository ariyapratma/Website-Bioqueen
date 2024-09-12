import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";

import { usePage } from "@inertiajs/react";

const Welcome = ({ auth }) => {
  const { props } = usePage();
  const { dataHeaderHome } = props;

  return (
    <div className="flex min-h-screen flex-col">
      <Head title="Home | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/* HeaderHome */}
        <div className="relative h-[600px] w-full overflow-hidden md:h-[700px] lg:h-[900px]">
          {/* Background Image */}
          <img
            src={dataHeaderHome?.image_url}
            alt="Header Background"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white lg:p-8">
            <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              {dataHeaderHome?.title}
            </h1>
            <p className="mb-6 text-center text-base sm:text-lg md:text-xl lg:text-xl">
              {dataHeaderHome?.description}
            </p>
            <button
              onClick={() => {
                window.location.href = dataHeaderHome?.whatsapp_link;
              }}
              className="text-base-content rounded-lg bg-custom-yellow px-4 py-2 text-base font-semibold transition-colors hover:bg-yellow-400 sm:px-6 sm:py-3 sm:text-lg"
            >
              Konsultasikan Sekarang
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
