import { useMemo } from "react";
import { useDebounce } from "./useDebounce";
import type { Character } from "@/types/character";

/**
 * Hook: useCharacterSearch
 * Filters a list of characters by name using a debounced query.
 * Avoids filtering on every keystroke by waiting 300ms after the last input change.
 * @param characters - The full list of characters to search through
 * @param query - The search string typed by the user
 * @returns { results } - The filtered list of characters
 */
const useCharacterSearch = (characters: Character[], query: string) => {
  const [debouncedQuery] = useDebounce(query, 300);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return characters;
    return characters.filter((c) =>
      c.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [characters, debouncedQuery]);

  return { results };
};

export { useCharacterSearch };
