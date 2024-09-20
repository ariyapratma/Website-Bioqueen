import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import HeaderMaklon from "@/Components/Maklon/HeaderMaklon";
import Footer from "@/Components/Footer/Footer";

const Maklon = ({ auth }) => {
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
