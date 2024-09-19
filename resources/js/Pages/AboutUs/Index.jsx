import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import { usePage } from "@inertiajs/react";
import HeaderAboutUs from "./HeaderAboutUs";
import HeroAboutUs from "@/Components/AboutUs/HeroAboutUs";
import HeroVisionMision from "@/Components/AboutUs/HeroVisionMision";
import HeroOurGallery from "@/Components/AboutUs/HeroOurGallery";
import HeroOurLegal from "@/Components/AboutUs/HeroOurLegal";
import FooterAboutUs from "@/Components/AboutUs/FooterAboutUs";

const Index = ({ auth }) => {
    const { props } = usePage();
    const {} = props;

    return (
        <div className="flex min-h-screen flex-col">
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
                {/* HeroOurLegal */}
                <HeroOurLegal />
            </main>
            <FooterAboutUs />
        </div>
    );
};

export default Index;
