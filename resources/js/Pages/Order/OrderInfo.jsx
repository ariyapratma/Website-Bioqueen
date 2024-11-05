import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import {
  MdFactCheck,
  MdReceiptLong,
  MdChat,
  MdAttachMoney,
  MdErrorOutline,
} from "react-icons/md";

const OrderInfo = ({ auth }) => {
  const user = auth.user;
  const [recipientName, setRecipientName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [provinceId, setProvinceId] = useState("");
  const [regencyId, setRegencyId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [villageId, setVillageId] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [notes, setNotes] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  // Mengambil cartItems dari usePage().props
  const { cartItems } = usePage().props;

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  if (!Array.isArray(cartItems)) {
    console.error("cartItems is not an array or is undefined");
  }
  

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

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleSubmit = async (e) => {
    if (cartItems.length === 0) {
      console.error("Cannot submit an empty cart");
      return;
    }
    e.preventDefault();

    // Check for empty fields
    if (
        !recipientName ||
        !email ||
        !provinceId ||
        !regencyId ||
        !districtId ||
        !villageId ||
        !postalCode
    ) {
        console.log("Incomplete Form Data: ", {
            recipientName,
            email,
            provinceId,
            regencyId,
            districtId,
            villageId,
            postalCode,
        });
        Swal.fire({
            icon: "error",
            title: "Incomplete Form",
            text: "Please fill out all required fields.",
            confirmButtonText: "OK",
        });
        return;
    }

  //   const orderItems = cartItems.map((item) => {
  //     if (!item.product || !item.product.id) {
  //         console.error("Invalid product for item:", item);
  //         console.log("Cart Items:", cartItems);
  //     }
  //     return {
  //         product_id: item.product?.id || null, // Set null jika tidak ada product.id
  //         quantity: item.quantity,
  //     };
  // });

  const orderItems = cartItems.map((item) => {
    if (!item.product || !item.product.id) {
        console.error("Invalid product for item:", item);
        // Jika ingin melewati item yang tidak valid, gunakan return di sini
        return null; // atau sesuai kebutuhan
    }
    return {
        product_id: item.product.id, // pastikan ini diakses dengan benar
        quantity: item.quantity,
    };
}).filter(item => item !== null); // menghapus item yang tidak valid dari array

  

    // Check if any product_id is missing
    const missingProductId = orderItems.some(item => !item.product_id);
    if (missingProductId) {
        console.error("Missing product_id in orderItems:", orderItems);
        Swal.fire({
            icon: "error",
            title: "Missing Product ID",
            text: "Please ensure all items in the cart have a valid product ID.",
            confirmButtonText: "OK",
        });
        return;
    }

    // Check if orderItems is empty
    if (orderItems.length === 0) {
        Swal.fire({
            icon: "error",
            title: "No Items in Cart",
            text: "Please add items to your cart before placing an order.",
            confirmButtonText: "OK",
        });
        return;
    }

    // CSRF token retrieval
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    if (!csrfToken) {
        Swal.fire({
            icon: "error",
            title: "CSRF Token Missing",
            text: "Please refresh the page and try again.",
            confirmButtonText: "OK",
        });
        return;
    }

    try {
        // Send data to the order endpoint
        const orderResponse = await fetch("/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({
                orderItems, // Ensure this is populated correctly
            }),
            credentials: "same-origin",
        });

        const orderResult = await orderResponse.json();

        if (!orderResponse.ok) {
            throw new Error(orderResult.message || "Failed to create order.");
        }

        // Get orderId from the response
        const orderId = orderResult.orderIds; // Dapatkan ID pesanan yang dibuat

        // Send order details to the order-details endpoint
        const detailsResponse = await fetch("/order-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({
                orderId, // Pastikan orderId disesuaikan
                recipientName,
                email,
                provinceId,
                regencyId,
                districtId,
                villageId,
                postalCode,
                notes,
                productId: orderItems.map(item => item.product_id),
            }),
            credentials: "same-origin",
        });

        const detailsResult = await detailsResponse.json();

        if (detailsResponse.ok) {
            Swal.fire({
                icon: "success",
                title: "Order Submitted",
                text: detailsResult.message || "Order and order details saved successfully!",
                confirmButtonText: "OK",
            });
        } else {
            throw new Error(detailsResult.message || "Failed to submit order details.");
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: error.message || "An error occurred while submitting the order.",
            confirmButtonText: "OK",
        });
    }
};
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex-1 bg-neutral-50 p-6">
        <div className="container mx-auto font-lexend">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Informasi Pemesanan */}
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-3xl font-bold text-gray-800">
                  Order Information
                </h1>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
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
                    <label className="block text-sm font-medium text-gray-700">
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

                  {/* Catatan */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded border border-gray-300 p-2"
                      rows="4"
                      placeholder="Add any additional instructions..."
                    />
                  </div>

                  {/* Dropdown Provinsi, Kabupaten, Kecamatan, Kelurahan */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
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

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Regency
                    </label>
                    <select
                      value={regencyId}
                      onChange={(e) => setRegencyId(e.target.value)}
                      className="w-full rounded border border-gray-300 p-2"
                      required
                    >
                      <option value="">Select Regency</option>
                      {regencies.map((regency) => (
                        <option key={regency.id} value={regency.id}>
                          {regency.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      District
                    </label>
                    <select
                      value={districtId}
                      onChange={(e) => setDistrictId(e.target.value)}
                      className="w-full rounded border border-gray-300 p-2"
                      required
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Village
                    </label>
                    <select
                      value={villageId}
                      onChange={(e) => setVillageId(e.target.value)}
                      className="w-full rounded border border-gray-300 p-2"
                      required
                    >
                      <option value="">Select Village</option>
                      {villages.map((village) => (
                        <option key={village.id} value={village.id}>
                          {village.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Kode Pos */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <input
                      type="number"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full rounded border border-gray-300 p-2"
                      required
                    />
                  </div>

                  {/* Tabel Order Items */}
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500">No items in the order</p>
                  ) : (
                    <div className="mb-4 overflow-x-auto">
                      <h2 className="mb-2 text-lg font-semibold">
                        Order Items
                      </h2>
                      <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-md">
                        <thead>
                          <tr className="border bg-custom-yellow">
                            <th className="px-6 py-3 text-left font-lexend font-medium tracking-wider text-black">
                              Product
                            </th>
                            <th className="px-6 py-3 text-left font-lexend font-medium tracking-wider text-black">
                              Price
                            </th>
                            <th className="px-6 py-3 text-left font-lexend font-medium tracking-wider text-black">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-left font-lexend font-medium tracking-wider text-black">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, index) => (
                            <tr key={index}>
                              <td className="whitespace-nowrap border px-6 py-4 font-lexend text-sm text-gray-700">
                                {item.product.name}
                              </td>
                              <td className="whitespace-nowrap border px-6 py-4 font-lexend text-sm text-gray-700">
                                Rp{" "}
                                {parseFloat(item.product.price).toLocaleString(
                                  "id-ID",
                                )}
                              </td>
                              <td className="whitespace-nowrap border px-6 py-4 font-lexend text-sm text-gray-700">
                                {item.quantity}
                              </td>
                              <td className="whitespace-nowrap border px-6 py-4 font-lexend text-sm text-gray-700">
                                Rp{" "}
                                {parseFloat(
                                  item.product.price * item.quantity,
                                ).toLocaleString("id-ID")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="mt-4 w-full rounded-md bg-custom-yellow py-2 font-lexend font-semibold text-black hover:bg-yellow-600"
                  >
                    Submit Order
                  </button>
                </form>
              </div>
            </div>

            {/* Informasi Pembayaran */}
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                  Payment Information
                </h2>
                <p className="mb-4 text-gray-600">
                  Untuk kenyamanan, kami menyediakan opsi pembayaran melalui
                  Whatsapp agar lebih mudah dan cepat.
                </p>

                {/* Informasi tambahan tentang pembayaran */}
                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                  Payment Method
                </h2>

                {/* Icon dan Deskripsi */}
                <div className="mb-2 flex items-center gap-2">
                  <MdReceiptLong className="text-custom-yellow" size={20} />
                  <p className="text-gray-600">
                    Terima struk pembayaran di Whatsapp.
                  </p>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <MdFactCheck className="text-custom-yellow" size={20} />
                  <p className="text-gray-600">
                    Ikuti instruksi di chat Whatsapp.
                  </p>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <MdAttachMoney className="text-custom-yellow" size={20} />
                  <p className="text-gray-600">
                    Kirim bukti pembayaran di Whatsapp.
                  </p>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <MdErrorOutline className="text-red-500" size={20} />
                  <p className="text-red-500">
                    Pastikan nomor Whatsapp Anda aktif untuk menerima struk.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <MdChat className="text-custom-yellow" size={20} />
                  <p className="text-gray-600">
                    Jika ada pertanyaan, silahkan hubungi kami di Whatsapp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
