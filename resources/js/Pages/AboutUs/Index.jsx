import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import { usePage } from "@inertiajs/react";
import HeaderAboutUs from "./HeaderAboutUs";
import HeroAboutUs from "./HeroAboutUs";
import HeroVisionMision from "./HeroVisionMision";
import HeroOurGallery from "./HeroOurGallery";
import Footer from "@/Components/Footer/Footer";

const Index = ({ auth }) => {
  const { props } = usePage();
  const {} = props;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Head title="About Us | PT Ratu Bio Indonesia" />
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
      </main>
      <Footer/>
    </div>
  );
};

export default Index;
