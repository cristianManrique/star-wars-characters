"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_CHARACTERS, CREATE_CHARACTER } from "@/lib/queries";
import type { Character } from "@/types/character";
import CharacterList from "./components/CharacterList";
import CharacterFormModal from "./components/CharacterFormModal";
import { useCharacterSearch } from "@/app/hooks/useCharacterSearch";
import Loading from "../../_ui/Loading";
import Error from "../../_ui/Error";

const CharactersPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  const [query, setQuery] = useState("");

  const { results } = useCharacterSearch(
    (data?.allPeople?.people as Character[]) ?? [],
    query,
  );
  const [createCharacter] = useMutation(CREATE_CHARACTER, {
    refetchQueries: [{ query: GET_CHARACTERS }],
  });

  const handleCreate = (formData: {
    name: string;
    birthYear: string;
    homeworldName: string;
  }) => {
    createCharacter({ variables: formData });
    setShowForm(false);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-shrink-0 flex items-center px-8 py-3 border-b border-sw-yellow/50">
        <Link href="/" className="flex-1">
          <h1 className="text-3xl font-bold text-sw-yellow">
            STAR WARS
            <span className="text-xl text-sw-beige font-normal">
              {" "}
              Characters
            </span>
          </h1>
        </Link>

        <input
          className="flex-1 max-w-sm rounded-full border border-sw-beige/30 bg-transparent
               text-sw-beige px-4 py-2 text-sm focus:outline-none focus:border-sw-yellow
               placeholder:text-zinc-600 w-40 focus:w-60 transition-all duration-200 focus:border-sw-yellow"
          placeholder="Search characters..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="rounded-full bg-sw-purple hover:bg-sw-dark-purple text-white px-4 py-2 text-sm
              transition-colors duration-200 transition-all duration-200 w-40 hover:w-45"
          >
            + Add Character
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-8 py-6">
        <CharacterList characters={results as Character[]} />
      </main>

      <CharacterFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default CharactersPage;
