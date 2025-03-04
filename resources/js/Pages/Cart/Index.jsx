import Navbar from "@/Components/Navbar/Navbar";
import { Inertia } from "@inertiajs/inertia";
import Footer from "@/Components/Footer/Footer";
import Swal from "sweetalert2";
import { useState } from "react";
import { Head } from "@inertiajs/react";

const Index = ({ auth, cartItems }) => {
  const { user } = auth;
  const [activeMenu, setActiveMenu] = useState(1);
  const [completedStep, setCompletedStep] = useState(1);
  const [updatedItems, setUpdatedItems] = useState(cartItems);
  const totalPrice = updatedItems.reduce(
    (sum, item) => sum + item.product?.price * item.quantity,
    0,
  );

  const handleTabClick = (menuIndex) => {
    if (menuIndex <= completedStep) {
      setActiveMenu(menuIndex);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Please complete the previous step first!",
        confirmButtonColor: "#000000",
        scrollbarPadding: false,
        backdrop: false,
      });
    }
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      Swal.fire({
        title: "Error!",
        text: "Quantity must be greater than 0.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
        scrollbarPadding: false,
        backdrop: false,
      });
      return;
    }

    if (quantity < 200) {
      Swal.fire({
        title: "Minimum Quantity Reached!",
        text: "The minimum quantity allowed is 200.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
        scrollbarPadding: false,
        backdrop: false,
      });
      return;
    }

    const newUpdatedItems = updatedItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity: quantity,
            price: item.product?.price * quantity,
          }
        : item,
    );
    setUpdatedItems(newUpdatedItems);

    const itemToUpdate = newUpdatedItems.find((item) => item.id === itemId);
    if (itemToUpdate) {
      fetch(`/cart/update/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        credentials: "include",
        body: JSON.stringify({
          quantity: itemToUpdate.quantity,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update quantity.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            // Swal.fire({
            //   title: "Updated!",
            //   text: "Quantity updated successfully.",
            //   icon: "success",
            //   confirmButtonText: "OK",
            //   confirmButtonColor: "#000000",
            //   scrollbarPadding: false,
            //   backdrop: false,
            // });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.message || "Failed to update quantity.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#000000",
            scrollbarPadding: false,
            backdrop: false,
          });
        });
    }
  };

  const handleCheckout = async () => {
    if (updatedItems.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "Your cart is empty.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
        scrollbarPadding: false,
        backdrop: false,
      });
      return;
    }

    // Persiapkan data pesanan
    const orderData = updatedItems.map((item) => ({
      product_id: item.product?.id,
      quantity: item.quantity,
      price: item.product?.price,
    }));

    // Validasi data
    if (!orderData.every((item) => item.product_id && item.quantity >= 1)) {
      Swal.fire({
        title: "Error!",
        text: "All products must have a valid product ID and quantity.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
      });
      return;
    }

    // Hitung total harga
    const totalPrice = orderData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    try {
      const response = await fetch("/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content"),
        },
        credentials: "include",
        body: JSON.stringify({
          orderItems: orderData,
          total_price: totalPrice,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Your order has been placed successfully.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#000000",
        }).then(() => {
          window.location.href = "/order";
        });
      } else {
        throw new Error(result.message || "Failed to process your order.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "There was an error processing your order.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#000000",
      });
    }
  };

  const removeFromCart = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      confirmButtonColor: "#000000",
      cancelButtonText: "Cancel",
      scrollbarPadding: false,
      backdrop: false,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/cart/remove/${itemId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
          credentials: "include",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to remove the item.");
            }
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              Swal.fire({
                title: "Deleted!",
                text: "The item has been removed successfully.",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#000000",
                scrollbarPadding: false,
                backdrop: false,
              });
              window.dispatchEvent(new Event("cartUpdated"));
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message || "Failed to remove the item.",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#000000",
              scrollbarPadding: false,
              backdrop: false,
            });
          });
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Head title="Cart | PT Ratu Bio Indonesia" />
      <Navbar auth={auth} />
      {/* Main Content */}
      <main className="mb-8 mt-24 flex-grow px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Mobile Navigation Steps */}
          <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            {/* Step 1: Cart */}
            <button
              onClick={() => handleTabClick(1)}
              className={`${
                activeMenu === 1
                  ? "bg-black text-white"
                  : "bg-whitetext-black border border-black opacity-50"
              } w-full rounded-full px-4 py-3 font-bold transition duration-300 sm:w-auto`}
            >
              1. Cart
            </button>

            {/* Step 2: Order Info */}
            <button
              onClick={() => handleTabClick(2)}
              className={`${
                activeMenu === 2
                  ? "bg-black text-white"
                  : "bg-whitetext-black cursor-not-allowed border border-black opacity-50"
              } w-full rounded-full px-4 py-3 font-bold transition duration-300 sm:w-auto`}
            >
              2. Order Info
            </button>

            {/* Step 3: Payment */}
            <button
              onClick={() => handleTabClick(3)}
              className={`${
                activeMenu === 3
                  ? "bg-black text-white"
                  : "bg-whitetext-black cursor-not-allowed border border-black opacity-50"
              } w-full rounded-full px-4 py-3 font-bold transition duration-300 sm:w-auto`}
            >
              3. Payment
            </button>
          </div>

          {/* Cart Content */}
          {updatedItems.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            <div>
              {/* Product List */}
              <div className="space-y-4">
                {updatedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md"
                  >
                    {/* Product Name */}
                    <div className="flex-1">
                      <img
                        src={`/storage/${item.product?.image_url}`}
                        alt={item.product?.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <p className="font-semibold">{item.product?.name}</p>
                      <p className="text-sm text-gray-500">
                        Rp{" "}
                        {parseFloat(item.product?.price).toLocaleString(
                          "id-ID",
                        )}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="bg-whitetext-black rounded-lg px-3 py-1 text-lg font-bold text-gray-700 shadow-md hover:bg-gray-300 focus:outline-none"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-whitetext-black rounded-lg px-3 py-1 text-lg font-bold text-gray-700 shadow-md hover:bg-gray-300 focus:outline-none"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-sm font-semibold text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {/* Total Price */}
                <div className="mt-6 rounded-lg bg-white p-4 shadow-md">
                  <p className="text-sm font-bold">
                    Total Price: Rp {totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="mt-6 w-full rounded-full bg-black py-3 font-bold text-white transition duration-300 hover:bg-gray-800"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
