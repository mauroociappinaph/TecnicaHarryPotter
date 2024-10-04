import { useState } from "react";
import Alerta from "./Alerta";
import axios from "axios";
import { AlertaType } from "../types/AlertType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Character {
  _id?: string;
  name: string;
  role: string;
  house: string;
  species: string;
  wizard: boolean;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  alive: boolean;
  image: string;
}

const Formulario: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("Mago");
  const [house, setHouse] = useState<string>("Gryffindor");
  const [species, setSpecies] = useState<string>("Hombre");
  const [wizard, setWizard] = useState<boolean>(true);
  const [patronus, setPatronus] = useState<string>("");
  const [hogwartsStudent, setHogwartsStudent] = useState<boolean>(true);
  const [hogwartsStaff, setHogwartsStaff] = useState<boolean>(true);
  const [alive, setAlive] = useState<boolean>(true); // Mantener estado de alive
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [alerta, setAlerta] = useState<AlertaType | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  console.log(image);

  const uploadImageToCloudinary = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setImageUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "harrypotter");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dj8g1egez/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error al subir la imagen: ${response.status}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return null;
    } finally {
      setImageUploading(false);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file !== null && file !== undefined) {
      setImageFile(file);
      try {
        setPreviewImage(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error al previsualizar la imagen:", error);
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!name) {
        setAlerta({
          msg: "El nombre del personaje es obligatorio.",
          error: true,
        });
        return;
      }

      // Subir la imagen a Cloudinary (si se ha seleccionado una)
      const imageUrl = await uploadImageToCloudinary();

      // Crear el objeto del nuevo personaje
      const newCharacter: Character = {
        name,
        role, // Opcional
        house, // Opcional
        species, // Opcional
        wizard, // Opcional
        patronus, // Opcional
        hogwartsStudent, // Opcional
        hogwartsStaff, // Opcional
        alive, // Opcional
        image: imageUrl || "", // Opcional, si no se selecciona una imagen, será una cadena vacía
      };

      // Realizar la petición POST
      const response = await axios.post(
        "http://localhost:4000/api/characters/create-character",
        newCharacter,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("No se pudo crear el personaje");
      }

      setAlerta({ msg: "Personaje creado correctamente", error: false });

      // Resetear el formulario
      setName("");
      setRole("Mago");
      setHouse("Gryffindor");
      setSpecies("Humano");
      setWizard(true);
      setPatronus("");
      setHogwartsStudent(true);
      setHogwartsStaff(true);
      setAlive(true);
      setImageFile(null);
      setImage("");
    } catch (error) {
      console.error("Error al crear el personaje:", error);
      setAlerta({
        msg: "Error al crear el personaje. Intenta de nuevo.",
        error: true,
      });
    }
  };
  const { msg } = alerta || {}; // Desestructurar msg

  const handleAliveChange = (value: string) => {
    setAlive(value === "true"); // Actualiza el estado de alive
  };

  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Crear Personaje de Harry Potter
      </h2>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-gray-700 uppercase font-bold">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre del Personaje"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="role" className="text-gray-700 uppercase font-bold">
            Rol
          </label>
          <input
            id="role"
            type="text"
            placeholder="Rol del Personaje"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="house" className="text-gray-700 uppercase font-bold">
            Casa
          </label>
          <Select value={house} onValueChange={setHouse}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Seleccionar casa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Gryffindor">Gryffindor</SelectItem>
              <SelectItem value="Slytherin">Slytherin</SelectItem>
              <SelectItem value="Ravenclaw">Ravenclaw</SelectItem>
              <SelectItem value="Hufflepuff">Hufflepuff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-5">
          <label htmlFor="house" className="text-gray-700 uppercase font-bold">
            Especie
          </label>
          <Select value={species} onValueChange={setSpecies}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Seleccionar especie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Humano">Humano</SelectItem>
              <SelectItem value="Elfo doméstico">Elfo doméstico</SelectItem>
              <SelectItem value="Centauro">Centauro</SelectItem>
              <SelectItem value="Fantasma">Fantasma</SelectItem>
              <SelectItem value="Hombre lobo">Hombre lobo</SelectItem>
              <SelectItem value="Gigante">Gigante</SelectItem>
              <SelectItem value="Duende">Duende</SelectItem>
              <SelectItem value="Veela">Veela</SelectItem>
              <SelectItem value="Troll">Troll</SelectItem>
              <SelectItem value="Animago">Animago</SelectItem>
              <SelectItem value="Sirena">Sirena</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="patronus"
            className="text-gray-700 uppercase font-bold"
          >
            Patronus
          </label>
          <input
            id="patronus"
            type="text"
            placeholder="Patronus del Personaje"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={patronus}
            onChange={(e) => setPatronus(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="patronus"
            className="text-gray-700 uppercase font-bold"
          >
            Vivo
          </label>
          <Select
            value={alive ? "true" : "false"}
            onValueChange={handleAliveChange}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Sí</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="hogwartsStudent"
            className="text-gray-700 uppercase font-bold"
          >
            Estudiante de Hogwarts
          </label>
          <Select
            value={hogwartsStudent ? "yes" : "no"}
            onValueChange={(value) => setHogwartsStudent(value === "yes")}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="hogwartsStaff"
            className="text-gray-700 uppercase font-bold"
          >
            Personal de Hogwarts
          </label>
          <Select
            value={hogwartsStaff ? "yes" : "no"}
            onValueChange={(value) => setHogwartsStaff(value === "yes")}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-5">
          <label htmlFor="image" className="text-gray-700 uppercase font-bold">
            Imagen
          </label>

          {!imageFile ? ( // Solo muestra el input si no hay imagen seleccionada
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={previewImage || ""}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setPreviewImage(null);
                }}
                className="mt-3 bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md my-1"
              >
                Cambiar Imagen
              </button>
            </div>
          )}

          {imageUploading && (
            <p className="text-center text-indigo-600 font-bold">
              Subiendo imagen...
            </p>
          )}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Crear Personaje"
        />
      </form>

      {msg && <Alerta alerta={alerta as AlertaType} />}
    </>
  );
};

export default Formulario;
