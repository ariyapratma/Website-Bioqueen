import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import { usePage } from "@inertiajs/react";
import HeaderAboutUs from "./HeaderAboutUs";
import HeroAboutUs from "./HeroAboutUs";
import HeroVisionMision from "./HeroVisionMision";
import HeroOurGallery from "./HeroOurGallery";
import HeaderMaklon from "../Maklon/HeaderMaklon";
import HeroMaklon from "@/Components/Maklon/HeroMaklon";
import HeaderContact from "../Contact/HeaderContact";
import HeroContact from "../Contact/HeroContact";
import Footer from "@/Components/Footer/Footer";

const Index = ({ auth }) => {
  const { props } = usePage();
  const {} = props;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Head title="AboutUs | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/* HeaderAboutUs */}
        <HeaderAboutUs />
        {/* HeroAboutUs */}
        <HeroAboutUs />
        {/* HeroVisionMision */}
        <HeroVisionMision />
        {/* HeroOurGallery */}
        <HeroOurGallery />
        {/* HeaderMaklon */}
        <HeaderMaklon />
        {/* HeroMaklon */}
        <HeroMaklon />
        {/* HeaderContact */}
        <HeaderContact />
        {/* HeroContact */}
        <HeroContact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
