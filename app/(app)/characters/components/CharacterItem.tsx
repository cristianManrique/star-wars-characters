"use client";

import { memo } from "react";
import type { Character } from "@/types/character";

interface CharacterItemProps {
  character: Character;
  onEdit: (character: Character) => void;
  onDelete: (id: string) => void;
}

const CharacterItem = ({ character, onEdit, onDelete }: CharacterItemProps) => {
  return (
    <li
      className="border border-sw-beige hover:border-sw-yellow/80
      transition-colors duration-200 rounded-lg p-4 bg-transparent hover:bg-sw-purple/30"
    >
      <p className="text-white font-semibold">{character.name}</p>
      <div className="flex flex-col lg:flex-row  gap-2 lg:items-center justify-between">
        <div className="flex flex-row lg:flex-col gap-2">
          <p className="text-zinc-500 text-sm">
            Birth year:
            <br />
            <span className="text-sw-beige">
              {character.birthYear ?? "Unknown"}
            </span>
          </p>
          <p className="text-zinc-500 text-sm">
            Homeworld:
            <br />
            <span className="text-sw-beige">
              {character.homeworld?.name ?? "Unknown"}
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(character)}
            className="rounded-full px-4 py-2 text-center text-sm bg-sw-purple hover:bg-sw-dark-purple
              text-white text-center w-20 hover:w-24 transition-all duration-200"
          >
            🖌️ Edit
          </button>
          <button
            onClick={() => onDelete(character.id)}
            className="rounded-full  text-center bg-sw-red px-4 py-2 text-sm text-white text-center
            hover:bg-sw-dark-red w-24 hover:w-28 transition-all duration-200"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default memo(CharacterItem);
