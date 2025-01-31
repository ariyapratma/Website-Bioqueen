import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import HeaderOrder from "./HeaderOrder";
import Footer from "@/Components/Footer/Footer";
import OrderInformation from "./OrderInformation";

const Order = ({ auth }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Head title="Order | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/*HeaderOrder*/}
        <HeaderOrder />
        <OrderInformation auth={auth} />
      </main>
      <Footer />
    </div>
  );
};

export default Order;
