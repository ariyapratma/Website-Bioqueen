import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import HeaderProduct from "./HeaderProduct";
import HeroCategories from "./HeroCategories";
import ProductList from "./ProductList";
// import HeroProduct from "./HeroProduct";
import Footer from "@/Components/Footer/Footer";

const Product = ({ auth }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Head title="Product | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {/*HeaderProduct*/}
        <HeaderProduct />
        <HeroCategories />
        <ProductList />
        {/* <HeroProductList />
        <HeroDetailProduct /> */}
        {/*HeroProduct*/}
        {/* <HeroProduct /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Product;
