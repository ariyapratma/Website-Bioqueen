import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import HeaderProduct from "@/Components/Product/HeaderProduct";
import Footer from "@/Components/Footer/Footer";

const Product = ({ auth }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Head title="Product | PT Ratu Bio Indonesia" />
            <Navbar auth={auth} />
            <main className="flex-grow">
                {/*HeaderProduct*/}
                <HeaderProduct />
            </main>
            <Footer />
        </div>
    );
};

export default Product;
