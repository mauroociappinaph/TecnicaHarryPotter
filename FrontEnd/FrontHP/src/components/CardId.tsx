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
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { ModalEditCharacter } from "../components/ModalEditCharacter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { CharacterId } from "../types/CharacterId";

export default function CardId() {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterId | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await clienteAxios.get(`/characters/${id}`);
        console.log("Datos recibidos:", response.data); // Log para verificar los datos recibidos
        setCharacter(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del personaje:", error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Cargando...</div>;
  }

  if (!character) {
    return (
      <div className="text-center text-lg font-semibold">
        Personaje no encontrado
      </div>
    );
  }

  const handlerDelete = async () => {
    try {
      await clienteAxios.delete(`/characters/${id}`);
      window.location.href = "/admin/characters";
    } catch (error) {
      console.error("Error al eliminar el personaje:", error);
    }
  };

  const handleUpdateCharacter = (updatedCharacter: CharacterId) => {
    setCharacter(updatedCharacter);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Card className="shadow-lg rounded-2xl overflow-hidden w-1/3">
        <CardHeader
          className="p-6 text-center bg-cover bg-center relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1594399433555-467d140af8ae?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
          {/* Capa de superposición para oscurecer */}
          <img
            src={character.image}
            alt={character.name}
            className="w-40 h-40 rounded-full mx-auto object-cover shadow-lg border-4 border-white relative z-10"
          />
          <CardTitle className="text-4xl font-extrabold mt-4 text-white relative z-10">
            {character.name}
          </CardTitle>
          <CardDescription className="text-white mt-2 italic relative z-10">
            {character.role || "Sin rol específico"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 gap-6 md:grid-cols-2 text-gray-900">
          {/* Casa */}
          <div className="flex items-center space-x-4">
            <span className="bg-indigo-200 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7h18M3 12h18m-9 5h9"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-600">Casa</p>
              <p className="text-lg font-medium">
                {character.house || "Sin casa"}
              </p>
            </div>
          </div>

          {/* Especie */}
          <div className="flex items-center space-x-4">
            <span className="bg-green-200 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c1.333-1.333 2-3 2-5s-.667-3.667-2-5C9.333 0.333 8.667 2 8 4s-.667 3.667 2 4z"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-600">Especie</p>
              <p className="text-lg font-medium">
                {character.species || "Desconocida"}
              </p>
            </div>
          </div>

          {/* Patronus */}
          <div className="flex items-center space-x-4">
            <span className="bg-blue-200 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a4 4 0 018 0v6M9 10V5a4 4 0 018 0v5"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-600">Patronus</p>
              <p className="text-lg font-medium">
                {character.patronus || "Ninguno"}
              </p>
            </div>
          </div>

          {/* Vivo */}
          <div className="flex items-center space-x-4">
            <span
              className={`p-3 rounded-full ${
                character.alive ? "bg-green-200" : "bg-red-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${
                  character.alive ? "text-green-700" : "text-red-700"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-600">Estado</p>
              <p className="text-lg font-medium">
                {character.alive ? "Vivo" : "Fallecido"}
              </p>
            </div>
          </div>

          {/* Estudiante de Hogwarts */}
          <div className="flex items-center space-x-4">
            <span className="bg-yellow-200 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6l4 4M6 6h12"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Estudiante de Hogwarts
              </p>
              <p className="text-lg font-medium">
                {character.hogwartsStudent ? "Sí" : "No"}
              </p>
            </div>
          </div>

          {/* Personal de Hogwarts */}
          <div className="flex items-center space-x-4">
            <span className="bg-purple-200 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 12h4l3 8-10-16h8l-3 8z"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Personal de Hogwarts
              </p>
              <p className="text-lg font-medium">
                {character.hogwartsStaff ? "Sí" : "No"}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-indigo-50 p-6 flex justify-center space-x-4">
          <ModalEditCharacter
            character={character}
            onUpdateCharacter={handleUpdateCharacter}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-destructive text-white px-6 py-3 rounded-full hover:bg-destructive-600 transition-transform transform hover:scale-105 shadow-lg">
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro de que deseas eliminar este personaje? Esta
                  acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-yellow-400 text-white"
                  onClick={handlerDelete}
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
