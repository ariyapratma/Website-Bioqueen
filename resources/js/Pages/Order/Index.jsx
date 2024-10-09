import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import HeaderOrder from "./HeaderOrder";
import Cart from "./Cart";
import Footer from "@/Components/Footer/Footer";

const Order = ({ auth }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Head title="Order | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/*HeaderOrder*/}
        <HeaderOrder />
        {/*Cart*/}
        <Cart />
      </main>
      <Footer />
    </div>
  );
};

export default Order;
