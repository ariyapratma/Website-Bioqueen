import { useState, useEffect } from "react";
import { RiNotificationLine } from "react-icons/ri";

const Notification = ({ auth }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk mengambil notifikasi
  const fetchNotifications = async () => {
    try {
      const response = await fetch("/notifications", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data);

      // Hitung jumlah notifikasi yang belum dibaca
      const unread = data.filter((notif) => !notif.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  // Panggil fungsi fetchNotifications saat komponen dimuat
  useEffect(() => {
    fetchNotifications();
  }, [auth]);

  // Handler untuk menandai semua notifikasi sebagai dibaca
  const markAllAsRead = async () => {
    try {
      const response = await fetch("/notifications/mark-all-as-read", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to mark notifications as read");
      }
      // Perbarui state notifikasi setelah berhasil
      fetchNotifications();
    } catch (error) {}
  };

  return (
    <div className="relative flex items-center justify-center p-1">
      {/* Ikon Notifikasi */}
      <RiNotificationLine
        className="h-6 w-6 cursor-pointer font-lexend text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      />
      {/* Badge untuk notifikasi yang belum dibaca */}
      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {unreadCount}
        </span>
      )}
      {/* Dropdown untuk menampilkan daftar notifikasi */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-4 w-72 translate-x-52 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5">
          {/* Header Dropdown dengan tombol close */}
          <div className="flex items-center justify-between p-4">
            <h3 className="mt-12 text-sm font-semibold text-gray-800">
              Notifications
            </h3>
            <button
              className="mt-20 text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Daftar Notifikasi */}
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="p-4 text-center text-sm text-gray-500">
                No notifications
              </li>
            ) : (
              notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`flex items-start gap-3 p-4 ${
                    notif.read
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <svg
                      className={`h-5 w-5 ${notif.read ? "text-gray-400" : "text-black"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  {/* Konten Notifikasi */}
                  <div className="flex-grow">
                    <p
                      className={`text-sm font-medium ${
                        notif.read ? "text-gray-600" : "text-black"
                      }`}
                    >
                      {notif.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(notif.created_at).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
          {/* Footer Dropdown */}
          <div className="border-t border-gray-200">
            <button
              className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
              // onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
