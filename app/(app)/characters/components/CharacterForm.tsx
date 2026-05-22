"use client";

import { useCallback, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";
import type { Character } from "@/types/character";

type CharacterFormProps = {
  initial?: Character;
  onSubmit: (data: {
    name: string;
    birthYear: string;
    homeworldName: string;
  }) => void;
  onCancel: () => void;
};

const CharacterForm = ({ initial, onSubmit, onCancel }: CharacterFormProps) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [homeworldName, setHomeworldName] = useState(initial?.homeworld?.name ?? "");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
        name,
        birthYear: birthDate ? format(birthDate, "yyyy-MM-dd") : (initial?.birthYear ?? ""),
        homeworldName,
      });
    },
    [birthDate, homeworldName, name, onSubmit, initial],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border rounded-lg p-4 border-sw-beige"
    >
      <input
        className="border rounded px-3 py-2 text-sm focus:border-sw-yellow"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="w-full text-left border rounded px-3 py-2 text-sm"
        >
          {birthDate
            ? format(birthDate, "PPP")
            : initial?.birthYear
              ? `Current: ${initial.birthYear}`
              : "Pick a birth date"}
        </button>

        {showPicker && (
          <div className="absolute z-10 bg-white border rounded shadow-lg mt-1">
            <DayPicker
              mode="single"
              selected={birthDate}
              onSelect={(date) => {
                setBirthDate(date);
                setShowPicker(false);
              }}
              captionLayout="dropdown"
              classNames={{
                root: "p-3 bg-black rounded-lg text-sw-beige shadow-[0_8px_30px_rgba(254,225,35,0.3)]",
                months: "flex flex-col",
                month_caption: "flex justify-center items-center mb-2",
                caption_label: "hidden",
                dropdowns: "flex gap-2 mb-2",
                dropdown:
                  "bg-black text-white border border-sw-beige rounded px-2 py-1 text-sm hover:text-sw-yellow transition-colors",
                nav: "flex justify-between mb-2",
                button_previous: "p-1 rounded hover:text-sw-purple transition-colors",
                button_next: "p-1 rounded hover:text-sw-yellow transition-colors",
                weekdays: "grid grid-cols-7 mb-1",
                weekday: "text-center text-xs text-sw-aqua font-semibold py-1",
                weeks: "flex flex-col gap-1",
                week: "grid grid-cols-7",
                day: "flex items-center justify-center",
                day_button:
                  "w-8 h-8 rounded-full text-sm hover:bg-sw-yellow hover:text-sw-dark-purple transition-colors",
                selected: "bg-sw-yellow ! text-black font-bold rounded-full",
                today: "text-sw-aqua font-bold",
                outside: "opacity-30",
                chevron: "fill-sw-purple hover:fill-sw-yellow transition-colors",
              }}
            />
          </div>
        )}
      </div>

      <input
        className="border rounded px-3 py-2 text-sm focus:border-sw-yellow"
        placeholder="Homeworld"
        value={homeworldName}
        onChange={(e) => setHomeworldName(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-full border border-sw-purple hover:bg-sw-dark-purple text-white px-4 py-2 text-sm"
        >
          {initial ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-sw-red hover:bg-sw-dark-red text-white px-4 py-2 text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CharacterForm;
