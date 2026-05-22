"use client";

import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client/react";
import {
  DELETE_CHARACTER,
  UPDATE_CHARACTER,
  GET_CHARACTERS,
} from "@/lib/queries";
import type { Character } from "@/types/character";
import ConfirmDialog from "@/app/_ui/ConfirmDialog";
import CharacterFormModal from "./CharacterFormModal";
import CharacterItem from "./CharacterItem";

type CharacterListProps = {
  characters: Character[];
};

const CharacterList = ({ characters }: CharacterListProps) => {
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(
    null,
  );
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const [deleteCharacter] = useMutation(DELETE_CHARACTER, {
    refetchQueries: [{ query: GET_CHARACTERS }],
  });

  const [updateCharacter] = useMutation(UPDATE_CHARACTER, {
    refetchQueries: [{ query: GET_CHARACTERS }],
  });

  const handleDelete = useCallback(
    (id: string) => {
      deleteCharacter({ variables: { id } });
    },
    [deleteCharacter],
  );

  const onConfirm = () => {
    if (confirmingId) handleDelete(confirmingId);
    setConfirmingId(null);
  };

  const handleUpdate = useCallback(
    (
      id: string,
      data: { name: string; birthYear: string; homeworldName: string },
    ) => {
      updateCharacter({ variables: { id, ...data } });
      setEditingCharacter(null);
    },
    [updateCharacter, setEditingCharacter],
  );

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.map((character) => {
          return (
            <CharacterItem
              key={character.id}
              character={character}
              onEdit={setEditingCharacter}
              onDelete={setConfirmingId}
            />
          );
        })}
      </ul>
      <CharacterFormModal
        isOpen={!!editingCharacter}
        onClose={() => setEditingCharacter(null)}
        initial={editingCharacter ?? undefined}
        onSubmit={(data) => {
          if (editingCharacter) handleUpdate(editingCharacter.id, data);
          setEditingCharacter(null);
        }}
      />
      <ConfirmDialog
        isOpen={!!confirmingId}
        title="Delete this character?"
        message="This action cannot be undone."
        onConfirm={onConfirm}
        onCancel={() => setConfirmingId(null)}
      />
    </>
  );
};

export default CharacterList;
