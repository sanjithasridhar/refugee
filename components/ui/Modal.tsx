import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4 transition-opacity">
      <div className="bg-surface w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
