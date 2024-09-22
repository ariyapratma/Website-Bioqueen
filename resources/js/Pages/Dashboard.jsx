import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth }) {
  const user = auth.user;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-lexend text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 font-lexend font-medium text-green-700">
              You're logged in as {user.role}!
            </div>
          </div>

          {/* Menu untuk Admin */}
          {user.role === "admin" && (
            <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-bold">Admin Menu</h3>
              <ul>
                <h1 className="pt-2 text-lg font-bold">Home Page : </h1>
                <li>
                  <Link href="/header-home" className="text-blue-500">
                    Manage Header Home
                  </Link>
                </li>
                <li>
                  <Link href="/hero-flyer" className="text-blue-500">
                    Manage Hero Flyer
                  </Link>
                </li>
                <li>
                  <Link href="/hero-company" className="text-blue-500">
                    Manage Hero Company
                  </Link>
                </li>
                <li>
                  <Link href="/hero-why-choose" className="text-blue-500">
                    Manage Hero Why Choose
                  </Link>
                </li>
                <li>
                  <Link href="/hero-maklon-value" className="text-blue-500">
                    Manage Hero Maklon Value
                  </Link>
                </li>
                <li>
                  <Link href="/hero-team-value" className="text-blue-500">
                    Manage Hero Team Value
                  </Link>
                </li>
                <li>
                  <Link href="/hero-facilities-value" className="text-blue-500">
                    Manage Hero Facilities Value
                  </Link>
                </li>
                <li>
                  <Link href="/hero-certificate" className="text-blue-500">
                    Manage Hero Certificate
                  </Link>
                </li>
                <li>
                  <Link href="/hero-service" className="text-blue-500">
                    Manage Hero Service
                  </Link>
                </li>
                <li>
                  <Link href="/hero-video" className="text-blue-500">
                    Manage Hero Video
                  </Link>
                </li>
                <li>
                  <Link href="/hero-excellence-value" className="text-blue-500">
                    Manage Hero Excellence Value
                  </Link>
                </li>
                <h1 className="pt-2 text-lg font-bold">About Us Page : </h1>
                <li>
                  <Link href="/header-about-us" className="text-blue-500">
                    Manage Header About Us
                  </Link>
                </li>
                <h1 className="pt-2 text-lg font-bold">Contact Page : </h1>
                <li>
                  <Link href="/header-contact" className="text-blue-500">
                    Manage Header Contact
                  </Link>
                </li>
                <h1 className="pt-2 text-lg font-bold">Product Page : </h1>
                <li>
                  <Link href="/header-product" className="text-blue-500">
                    Manage Header Product
                  </Link>
                </li>
                <h1 className="pt-2 text-lg font-bold">Order Page : </h1>
                <li>
                  <Link href="/header-order" className="text-blue-500">
                    Manage Header Order
                  </Link>
                </li>
                <h1 className="pt-2 text-lg font-bold">Maklon Page : </h1>
                <li>
                  <Link href="/header-maklon" className="text-blue-500">
                    Manage Header Maklon
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Menu untuk User */}
          {user.role === "user" && (
            <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-bold">User Menu</h3>
              <ul>
                <li>
                  <Link href="/add-review" className="text-blue-500">
                    Add a Review
                  </Link>
                </li>
                <li>
                  <Link href="/my-reviews" className="text-blue-500">
                    View My Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/order" className="text-blue-500">
                    Make an Order
                  </Link>
                </li>
                {/* Daftar pesanan atau review yang sudah dibuat */}
                <li>
                  <Link href="/my-orders" className="text-blue-500">
                    View My Orders
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Menu untuk Guest */}
          {user.role === "guest" && (
            <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-bold">Guest Menu</h3>
              <ul>
                <li>
                  <Link href="/products" className="text-blue-500">
                    View Products
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
