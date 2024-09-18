import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import HeaderMaklon from "@/Components/Maklon/HeaderMaklon";
import Footer from "@/Components/Footer/Footer";

const Maklon = ({ auth }) => {
    const { props } = usePage();
    const {} = props;
    
    return (
        <div className="flex min-h-screen flex-col">
            <Head title="Maklon | PT Ratu Bio Indonesia" />
            <Navbar auth={auth} />
            <main className="flex-grow">
                {/*HeaderMaklon*/}
                <HeaderMaklon />
            </main>
            <Footer />
        </div>
    );
};

export default Maklon;
