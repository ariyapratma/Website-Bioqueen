import React, { useState, useEffect } from "react";

const OrderInfo = ({ auth }) => {
  const user = auth.user;
  const [recipientName, setRecipientName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [provinceId, setProvinceId] = useState("");
  const [regencyId, setRegencyId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [villageId, setVillageId] = useState("");

  // Tambahkan state untuk menyimpan provinsi
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  // Fetch Provinces dari API Anda
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/provinces"); // Pastikan URL endpoint sesuai
        const data = await response.json();
        setProvinces(data); // Update state provinsi
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  // Filter data berdasarkan pilihan pengguna
  const filteredRegencies = regencies.filter(
    (regency) => regency.province_id === provinceId
  );

  const filteredDistricts = districts.filter(
    (district) => district.regency_id === regencyId
  );

  const filteredVillages = villages.filter(
    (village) => village.district_id === districtId
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
                  disabled={!provinceId}
                >
                  <option value="">Select Regency</option>
                  {filteredRegencies.map((regency) => (
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
                  disabled={!regencyId}
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
                  disabled={!districtId}
                >
                  <option value="">Select Village</option>
                  {filteredVillages.map((village) => (
                    <option key={village.id} value={village.id}>
                      {village.name}
                    </option>
                  ))}
                </select>
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
