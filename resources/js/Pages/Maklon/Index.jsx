import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import HeaderMaklon from "./HeaderMaklon";
import HeroMaklon from "@/Components/Maklon/HeroMaklon";
import Footer from "@/Components/Footer/Footer";

const Maklon = ({ auth }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Head title="Maklon | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/*HeaderMaklon*/}
        <HeaderMaklon />
        {/*HeroMaklon*/}
        <HeroMaklon />
      </main>
      <Footer />
    </div>
  );
};

export default Maklon;
