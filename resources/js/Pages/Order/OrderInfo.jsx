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

  // Menambahkan state untuk orderItems
  const [orderItems, setOrderItems] = useState([]); // Tambahkan ini
  const { orderItems: pageOrderItems } = usePage().props; // Menerima data dari props Inertia

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Mengatur orderItems dari props Inertia jika tersedia
    if (pageOrderItems) {
      setOrderItems(pageOrderItems);
    }
  }, [pageOrderItems]);

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
        setProvinces(data); // Update state provinsi
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch Regencies (Kabupaten) dari API berdasarkan provinceId
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
        setRegencies(data); // Update state kabupaten
      } catch (error) {
        console.error("Error fetching regencies:", error);
      }
    };

    fetchRegencies();
  }, [provinceId]);

  // Fetch Districts (Kecamatan) dari API berdasarkan regencyId
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
        setDistricts(data); // Update state kecamatan
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [regencyId]);

  // Fetch Villages (Kelurahan) dari API berdasarkan districtId
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
        setVillages(data); // Update state kelurahan
      } catch (error) {
        console.error("Error fetching villages:", error);
      }
    };

    fetchVillages();
  }, [districtId]);

  // Filter data berdasarkan pilihan pengguna
  const filteredDistricts = districts.filter(
    (district) => district.regency_id === regencyId,
  );

  const filteredVillages = villages.filter(
    (village) => village.district_id === districtId,
  );

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
                  {filteredDistricts.map((district) => (
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
                  {filteredVillages.map((village) => (
                    <option key={village.id} value={village.id}>
                      {village.name}
                    </option>
                  ))}
                </select>
              </div>

              {orderItems && orderItems.length > 0 && (
                <div className="mb-4">
                  <h2 className="mb-2 text-lg font-semibold">Order Items</h2>
                  <ul>
                    {orderItems.map((item, index) => (
                      <li key={index} className="mb-1">
                        {item.name} - {item.quantity} pcs
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
