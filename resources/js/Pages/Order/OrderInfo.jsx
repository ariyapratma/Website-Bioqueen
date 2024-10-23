import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

const OrderInfo = ({ auth }) => {
  const user = auth.user;
  const [recipientName, setRecipientName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [provinceId, setProvinceId] = useState("");
  const [regencyId, setRegencyId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [villageId, setVillageId] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  // Mengambil cartItems dari usePage().props
  const { cartItems } = usePage().props;

  // Fetch Provinces dari API
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("api/provinces", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching provinces");
        }

        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch Regencies berdasarkan provinceId
  useEffect(() => {
    if (!provinceId) return;

    const fetchRegencies = async () => {
      try {
        const response = await fetch(`api/regencies/${provinceId}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching regencies");
        }

        const data = await response.json();
        setRegencies(data);
      } catch (error) {
        console.error("Error fetching regencies:", error);
      }
    };

    fetchRegencies();
  }, [provinceId]);

  // Fetch Districts berdasarkan regencyId
  useEffect(() => {
    if (!regencyId) return;

    const fetchDistricts = async () => {
      try {
        const response = await fetch(`api/districts?regency_id=${regencyId}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching districts");
        }

        const data = await response.json();
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [regencyId]);

  // Fetch Villages berdasarkan districtId
  useEffect(() => {
    if (!districtId) return;

    const fetchVillages = async () => {
      try {
        const response = await fetch(`api/villages?district_id=${districtId}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching villages");
        }

        const data = await response.json();
        setVillages(data);
      } catch (error) {
        console.error("Error fetching villages:", error);
      }
    };

    fetchVillages();
  }, [districtId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic submit form
    console.log({
      recipientName,
      email,
      provinceId,
      regencyId,
      districtId,
      villageId,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 bg-neutral-50 p-6">
        <div className="container mx-auto px-4 py-10 font-lexend">
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
              Informasi Pemesanan
            </h1>

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

              {/* Dropdown Provinsi */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Province
                </label>
                <select
                  value={provinceId}
                  onChange={(e) => setProvinceId(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                  required
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown Kabupaten */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Regency
                </label>
                <select
                  value={regencyId}
                  onChange={(e) => setRegencyId(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                  required
                  disabled={!provinceId} // Disable jika provinsi belum dipilih
                >
                  <option value="">Select Regency</option>
                  {regencies.map((regency) => (
                    <option key={regency.id} value={regency.id}>
                      {regency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown Kecamatan */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  District
                </label>
                <select
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                  required
                  disabled={!regencyId} // Disable jika kabupaten belum dipilih
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown Kelurahan */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Village
                </label>
                <select
                  value={villageId}
                  onChange={(e) => setVillageId(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                  required
                  disabled={!districtId} // Disable jika kecamatan belum dipilih
                >
                  <option value="">Select Village</option>
                  {villages.map((village) => (
                    <option key={village.id} value={village.id}>
                      {village.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tabel Order Items */}
              {cartItems.length === 0 ? (
                <p className="text-gray-500">No items in the order</p>
              ) : (
                <div className="mb-4 overflow-x-auto">
                  <h2 className="mb-2 text-lg font-semibold">Order Items</h2>
                  <table className="min-w-full border">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Product</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Quantity</th>
                        <th className="border px-4 py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="border px-4 py-2">
                            {item.product.name}
                          </td>
                          <td className="border px-4 py-2">
                            ${item.product.price}
                          </td>
                          <td className="border px-4 py-2">{item.quantity}</td>
                          <td className="border px-4 py-2">
                            ${item.product.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <button
                type="submit"
                className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
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
