import { Input } from "../components/ui/input";
import { Character } from "../types/Character";
import { useState, useEffect } from "react";

interface SearchProps {
  characters: Character[];
  setFilteredCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

export function Search({ characters, setFilteredCharacters }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        const filtered = characters.filter((character) =>
          character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredCharacters(filtered);
        setNoResults(filtered.length === 0);
      } else {
        setFilteredCharacters(characters);
        setNoResults(false);
      }
    }, 100); //! 100 ms debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, characters, setFilteredCharacters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 my-12">
        <Input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      {noResults && (
        <p className="bg-red-600 p-4 rounded-md text-white text-center text-sm font-semibold shadow-md">
          No se encontraron resultados para "{searchTerm}"
        </p>
      )}
    </>
  );
}
