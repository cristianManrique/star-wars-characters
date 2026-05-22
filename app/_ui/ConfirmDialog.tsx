import { useEffect } from "react";

interface ConfirmDialogProp {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProp) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black border border-sw-beige/30 rounded-xl p-6 w-full max-w-md shadow-[0_8px_30px_rgba(254,225,35,0.15)]">
        <h3 className="text-sw-yellow text-3x1">{title}</h3>
        <p>{message}</p>

        <div className="flex gap-2 mt-2">
          <button
            className="rounded-full border border-sw-beige/30 px-2 py-1"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-full bg-sw-red px-2 py-1"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
