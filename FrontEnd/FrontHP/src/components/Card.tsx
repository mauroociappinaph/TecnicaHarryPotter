import { useEffect, useState, useMemo } from "react";
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
import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

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
        setFilteredCharacters(response.data);
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const currentCharacters = useMemo(() => {
    const indexOfLastCharacter = currentPage * itemsPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - itemsPerPage;
    return filteredCharacters.slice(
      indexOfFirstCharacter,
      indexOfLastCharacter
    );
  }, [currentPage, filteredCharacters, itemsPerPage]);

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
        {currentCharacters.map((character: Character, index: number) => (
          <motion.div
            key={character._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
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
                <Button className="w-1/2 mx-auto flex justify-center items-center gap-2 rounded-xl bg-indigo-700 py-3 px-5 text-white font-bold hover:bg-indigo-800 transition-all duration-300 transform hover:scale-105 my-2">
                  <FaInfoCircle className="text-lg" />
                  Ver Información
                </Button>
              </Link>
              <CardFooter className="bg-gray-100 p-4 text-center rounded-b-xl">
                <CardDescription className="text-sm text-gray-500">
                  Este personaje es parte del universo de Harry Potter.
                </CardDescription>
              </CardFooter>
            </Card>
          </motion.div>
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
