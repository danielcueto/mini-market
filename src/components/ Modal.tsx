import React, { useState } from "react";
import { createPortal } from "react-dom";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [open, setOpen] = useState(false);
  if (!isOpen) return null;
  const handleClick = () => {
    onClose();
    setOpen(!open);
  };
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      setOpen(!open);
    }
  };
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div
        className="fixed inset-0 z-50 flex items-center backdrop-blur-sm bg-black/20 justify-center overflow-y-auto"
        onClick={onClose}
      />
      <div
        className="bg-white p-6 z-60 rounded-lg shadow-lg relative min-w-86 mx-auto my-auto animate-fadeIn"
        style={{
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        <button
          onClick={handleClick}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
    }
  `;
  document.head.appendChild(style);
}
