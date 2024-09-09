import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import HeaderHome from "./HeaderHome";
import HeroFlyer from "./HeroFlyer";
import HeroCompany from "./HeroCompany";
import HeroWhyChooseValue from "./HeroWhyChooseValue";
import HeroMaklonValue from "./HeroMaklonValue";
import HeroFacilitiesValue from "./HeroFacilitiesValue";
import HeroCertificate from "./HeroCertificate";
import HeroService from "./HeroService";
import HeroVideo from "./HeroVideo";
import HeroExcellenceValue from "./HeroExcellenceValue";
import HeroReview from "./HeroReview";
import HeroAddReview from "./HeroAddReview";

export default function Welcome({ auth }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Head title="Home | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      <main className="flex-grow">
        {" "}
        <HeaderHome />
        <HeroFlyer />
        <HeroCompany />
        <HeroWhyChooseValue />
        <HeroMaklonValue />
        <HeroFacilitiesValue />
        <HeroCertificate />
        <HeroService />
        <HeroVideo />
        <HeroExcellenceValue />
        <HeroReview />
        <HeroAddReview />
      </main>
      <div className="absolute right-0 top-0 p-6 text-end">
        {/* {auth.user ? (
            <Link
              href={route("dashboard")}
              className="font-semibold text-gray-600 hover:text-gray-900 focus:rounded-sm focus:outline focus:outline-2 focus:outline-red-500 dark:text-gray-400 dark:hover:text-white"
            >
              Dashboard
            </Link>
          ) : (
            <div>
              <Link
                href={route("login")}
                className="font-semibold text-gray-600 hover:text-gray-900 focus:rounded-sm focus:outline focus:outline-2 focus:outline-red-500 dark:text-gray-400 dark:hover:text-white"
              >
                Log in
              </Link>
              <Link
                href={route("register")}
                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 focus:rounded-sm focus:outline focus:outline-2 focus:outline-red-500 dark:text-gray-400 dark:hover:text-white"
              >
                Register
              </Link>
            </div>
          )} */}
      </div>
    </div>
  );
}
