import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import { usePage } from "@inertiajs/react";
import HeaderHome from "./HeaderHome";
import HeroFlyer from "./HeroFlyer";
import HeroCompany from "./HeroCompany";
import HeroWhyChooseValue from "./HeroWhyChooseValue";
import Footer from "@/Components/Footer/Footer";

const Welcome = ({ auth }) => {
  const { props } = usePage();
  const {} = props;

  return (
    <div className="flex min-h-screen flex-col">
      <Head title="Home | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/* HeaderHome */}
        <HeaderHome />
        {/* Hero Flyer */}
        <HeroFlyer />
        {/* Hero Company */}
        <HeroCompany />
        {/* Hero Why Choose Value */}
        <HeroWhyChooseValue />
      </main>
      <Footer />
    </div>
  );
};

export default Welcome;
