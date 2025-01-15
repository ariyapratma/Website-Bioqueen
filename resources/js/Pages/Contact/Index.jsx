import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import { usePage } from "@inertiajs/react";
import HeaderContact from "./HeaderContact";
import HeroContact from "./HeroContact";
import Footer from "@/Components/Footer/Footer";

const Index = ({ auth }) => {
  const { props } = usePage();
  const {} = props;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Head title="Contact | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
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
