import { useEffect } from "react";
import type { Character } from "@/types/character";
import CharacterForm from "./CharacterForm";

interface CharacterFormModal {
  isOpen: boolean;
  onClose: () => void;
  initial?: Character;
  onSubmit: (data: {
    name: string;
    birthYear: string;
    homeworldName: string;
  }) => void;
}

const CharacterFormModal = ({
  isOpen,
  onClose,
  initial,
  onSubmit,
}: CharacterFormModal) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black border border-sw-beige/30 rounded-xl p-6 w-full max-w-md shadow-[0_8px_30px_rgba(254,225,35,0.15)]">
        <CharacterForm
          initial={initial}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default CharacterFormModal;
