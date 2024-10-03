import { Input } from "../components/ui/input";
import { Character } from "../types/Character";
import { useState } from "react";

interface SearchProps {
  characters: Character[];
  setFilteredCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

export function Search({ characters, setFilteredCharacters }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtrar personajes según el término de búsqueda
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCharacters(filtered);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 my-12">
      <Input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearch}
        className="flex-grow border border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" 
      />
    </div>
  );
}
