import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import HeaderOrder from "@/Components/Order/HeaderOrder";
import Footer from "@/Components/Footer/Footer";

const Order = ({ auth }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Head title="Order | PT Ratu Bio Indonesia" />
            <Navbar auth={auth} />
            <main className="flex-grow">
                {/*HeaderOrder*/}
                <HeaderOrder />
            </main>
            <Footer />
        </div>
    );
};

export default Order;
