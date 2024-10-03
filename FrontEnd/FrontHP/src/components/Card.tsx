import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Paginador from "../components/Paginador";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Character } from "../types/Character";
import { Search } from "../components/Search";
import Spinner from "../components/ui/spinner";

export default function Cards() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await clienteAxios.get("/characters");
        setCharacters(response.data);
        setFilteredCharacters(response.data); // Inicializa los personajes filtrados
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Lógica para paginar personajes
  const indexOfLastCharacter = currentPage * itemsPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - itemsPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-indigo-700 text-center">
        Personajes
      </h1>
      <Search
        characters={characters}
        setFilteredCharacters={setFilteredCharacters}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {currentCharacters.map((character) => (
          <Card
            key={character._id}
            className="shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {character.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-center">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-36 h-36 object-cover rounded-full shadow-md"
                />
              </div>
              <div className="mt-4 text-left space-y-4">
                <p className="text-lg">
                  <span className="font-semibold text-indigo-700">Casa:</span>
                  <span
                    className={`ml-2 text-lg font-medium ${
                      character.house ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {character.house || "Desconocida"}
                  </span>
                </p>
              </div>
            </CardContent>
            <Link to={`/admin/characters/${character._id}`}>
              <Button className="w-1/2 mx-auto flex justify-center rounded-xl bg-indigo-700 py-3 px-5 text-white font-bold hover:bg-indigo-800 transition-colors duration-300 my-2">
                Ver Información
              </Button>
            </Link>
            <CardFooter className="bg-gray-100 p-4 text-center rounded-b-xl">
              <CardDescription className="text-sm text-gray-500">
                Este personaje es parte del universo de Harry Potter.
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Componente Paginador */}
      <Paginador
        itemsPerPage={itemsPerPage}
        totalItems={filteredCharacters.length} // Usar los personajes filtrados
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}
