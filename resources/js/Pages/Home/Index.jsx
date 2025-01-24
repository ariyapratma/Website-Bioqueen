import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import { usePage } from "@inertiajs/react";
import HeaderHome from "./HeaderHome";
import HeroFlyer from "./HeroFlyer";
import HeroCompany from "./HeroCompany";
import HeroWhyChooseValue from "./HeroWhyChooseValue";
import HeroMaklonValue from "./HeroMaklonValue";
import HeroTeamValue from "./HeroTeamValue";
import HeroFacilitiesValue from "./HeroFacilitiesValue";
import HeroCertificate from "./HeroCertificate";
import HeroService from "./HeroService";
import HeroVideo from "./HeroVideo";
import HeroExcellenceValue from "./HeroExcellenceValue";
import HeroReview from "./HeroReview";
import HeroAddReview from "./HeroAddReview";
import Footer from "@/Components/Footer/Footer";

const Index = ({ auth }) => {
  const { props } = usePage();
  const {} = props;
  const { dataHeroReview } = props;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
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
        {/* Hero Maklon Value */}
        <HeroMaklonValue />
        {/* Hero Team Value */}
        <HeroTeamValue />
        {/* Hero Facilities Value */}
        <HeroFacilitiesValue />
        {/* Hero Certificate */}
        <HeroCertificate />
        {/* Hero Service */}
        <HeroService />
        {/* Hero Video */}
        <HeroVideo />
        {/* Hero Excellence Value */}
        <HeroExcellenceValue />
        {/* Hero Review */}
        <HeroReview dataHeroReview={dataHeroReview} />
        {/* Hero Add Review */}
        <HeroAddReview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
