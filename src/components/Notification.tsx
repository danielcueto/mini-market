import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { IoIosAlert } from "react-icons/io";
import { BiSolidErrorAlt } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

export function Notification() {
  const context = useContext(NotificationContext);

  if (!context) return null;

  const { notification, clearNotification } = context;

  if (!notification) return null;

  const { message, type } = notification;

  const styles = {
    success: {
      bg: "bg-green-500",
      icon: <FaCheckCircle size={20} />,
    },
    error: {
      bg: "bg-red-500",
      icon: <BiSolidErrorAlt size={20} />,
    },
    info: {
      bg: "bg-blue-500",
      icon: <IoIosAlert size={20} />,
    },
  };

  const current = styles[type];

  return (
  <div
    className={`
      ${current.bg}
      fixed top-4 left-4 right-4 sm:left-auto sm:right-4
      z-50 text-white flex items-center gap-3
      p-4 rounded-lg shadow-lg
      max-w-full sm:max-w-sm
    `}
  >
    {current.icon}
    <span className="flex-1 text-sm break-words">{message}</span>
    <button
      onClick={clearNotification}
      className="ml-2 text-lg leading-none hover:text-gray-200"
      aria-label="Close"
    >
      ×
    </button>
  </div>
);

}
