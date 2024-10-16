import React, { useEffect, useRef, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import * as Control from "leaflet-control-geocoder";

const OrderInfo = ({ auth }) => {
  const user = auth.user;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [recipientName, setRecipientName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [mapCenter, setMapCenter] = useState([-6.200001, 106.845]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    // Inisialisasi peta
    mapInstanceRef.current = L.map(mapRef.current).setView(mapCenter, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // Inisialisasi geocoder
    geocoderRef.current = Control.Geocoder.nominatim();

    // Menangani event klik peta
    mapInstanceRef.current.on("click", (e) => {
      const { lat, lng } = e.latlng;

      // Reverse geocode lokasi yang diklik
      geocoderRef.current.reverse(
        L.latLng(lat, lng),
        (results) => {
          if (results && results.length > 0) {
            const firstResult = results[0];
            setAddress(firstResult.display_name);
            const postalCodeComponent =
              firstResult.properties?.address?.postcode || "";
            setPostalCode(postalCodeComponent);
          } else {
            alert("No address found for this location.");
          }
        },
        { addressdetails: 1, format: "json" }, // Pastikan addressdetails dan format ditentukan
      );
    });

    return () => {
      mapInstanceRef.current.remove();
    };
  }, [mapCenter]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAddress(value);

    // Jika input tidak kosong, mulai pencarian geocode
    if (value) {
      setLoading(true);
      geocoderRef.current.geocode(
        `${value}, Indonesia`,
        (results) => {
          if (results && results.length > 0) {
            console.log(results);
            setSuggestions(results);
          } else {
            setSuggestions([]);
          }
          setLoading(false);
        },
        { country: "Indonesia" },
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    // Atur alamat dan pembaruan tampilan peta
    setAddress(suggestion.display_name);
    const { lat, lon } = suggestion; // Ambil lat dan lon
    if (lat && lon) {
      mapInstanceRef.current.setView(
        [lat, lon],
        mapInstanceRef.current.getZoom(),
      ); // Pindahkan peta ke lokasi yang dipilih
    } else {
      alert("Latitude and longitude not available for this suggestion.");
    }
    setSuggestions([]); // Kosongkan saran setelah pemilihan
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post("/order/submit", {
      paymentMethod,
      notes,
      recipientName,
      email,
      address,
      postalCode,
      deliveryNotes,
      deliveryMethod,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 bg-neutral-50 p-6">
        <Head title="Order Info | PT Ratu Bio Indonesia" />

        <div className="container mx-auto px-4 py-10 font-lexend">
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
              Informasi Pemesanan
            </h1>

            <div className="mb-6 rounded-lg bg-gray-50 p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">
                Set Delivery Location
              </h2>
              <h3 className="text-md mb-2">1. Set Location</h3>
              <p className="mb-4">Set the exact location on the map</p>

              <div
                ref={mapRef}
                style={{ height: "400px", marginBottom: "20px" }}
              ></div>

              <input
                type="text"
                placeholder="Search Address"
                value={address}
                onChange={handleInputChange}
                className="mb-2 w-full rounded border border-gray-300 p-2"
                required
              />
              {loading && <p>Loading...</p>}
              {suggestions.length > 0 && (
                <ul className="max-h-40 overflow-y-auto rounded border border-gray-300 bg-white">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              )}

              <input
                type="text"
                placeholder="Complete Address"
                value={address}
                readOnly
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                readOnly
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded bg-blue-500 py-2 text-white transition duration-200 hover:bg-blue-600"
              >
                Submit Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
