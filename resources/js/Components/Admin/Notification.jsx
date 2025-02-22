import { useState, useEffect } from "react";
import { RiNotification4Line } from "react-icons/ri";

const Notification = ({ auth }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dropdown

  // Fungsi untuk mengambil data notifikasi dari backend
  const fetchNotifications = async () => {
    try {
      const response = await fetch("/notification", {
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
      console.log(data);
      setNotifications(data);

      // Hitung jumlah notifikasi yang belum dibaca
      const unread = data.filter((notif) => !notif.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Panggil fungsi fetchNotifications saat komponen dimuat
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handler untuk menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      const notificationIcon = document.querySelector(".notification-icon");
      if (notificationIcon && !notificationIcon.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {/* Ikon Notifikasi */}
      <div
        className="notification-icon relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
      >
        <RiNotification4Line className="h-5 w-5 text-gray-700 transition-colors duration-300" />
        {/* Badge untuk notifikasi yang belum dibaca */}
        {unreadCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown untuk menampilkan daftar notifikasi */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md bg-white shadow-lg z-50">
          <div className="p-4 border-b">
            <p className="text-sm font-semibold text-gray-800">
              Notifications for {auth?.user?.name}
            </p>
          </div>
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No notifications</p>
          ) : (
            <ul>
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`border-b p-3 ${
                    notif.read ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <p>{notif.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;