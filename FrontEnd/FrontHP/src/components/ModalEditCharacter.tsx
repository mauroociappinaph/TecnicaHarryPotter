import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import clienteAxios from "../config/axios";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { CharacterId } from "../types/CharacterId";

interface ModalEditCharacterProps {
  character: CharacterId;
  onUpdateCharacter: (updatedCharacter: CharacterId) => void;
}

export function ModalEditCharacter({
  character,
  onUpdateCharacter,
}: ModalEditCharacterProps) {
  const { id } = useParams();
  const [formData, setFormData] = useState<CharacterId>(character);
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHouseChange = (value: string) => {
    setFormData({
      ...formData,
      house: value,
    });
  };

  const handleSpeciesChange = (value: string) => {
    setFormData({
      ...formData,
      species: value,
    });
  };

  const handleAliveChange = (value: string) => {
    setFormData({
      ...formData,
      alive: value === "true",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return;
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
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return null;
    } finally {
      setImageUploading(false);
    }
  };
  const handlerEdit = async () => {
    let imageUrl: string | null = null;

    if (imageFile) {
      imageUrl = await uploadImageToCloudinary();
    }

    const updatedData = {
      ...formData,
      image: imageUrl || formData.image,
    };

    try {
      const response = await clienteAxios.put(`/characters/${id}`, updatedData);
      onUpdateCharacter(response.data);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al actualizar el personaje:", error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar personaje</DialogTitle>
          <DialogDescription>
            Haz cambios en la información del personaje y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Rol
            </Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          {/* Select para Casa */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="house" className="text-right">
              Casa
            </Label>
            <Select value={formData.house} onValueChange={handleHouseChange}>
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

          {/* Select para Especie */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="species" className="text-right">
              Especie
            </Label>
            <Select
              value={formData.species}
              onValueChange={handleSpeciesChange}
            >
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="patronus" className="text-right">
              Patronus
            </Label>
            <Input
              id="patronus"
              name="patronus"
              value={formData.patronus}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          {/* Estado (Vivo, Muerto, Desconocido) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alive" className="text-right">
              Vivo
            </Label>
            <Select
              value={formData.alive ? "true" : "false"}
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
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Estudiante de Hogwarts</Label>
          <Checkbox
            checked={formData.hogwartsStudent}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, hogwartsStudent: checked as boolean })
            }
            className="col-span-3"
          />
        </div>

        {/* Personal de Hogwarts */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Personal de Hogwarts</Label>
          <Checkbox
            checked={formData.hogwartsStaff}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, hogwartsStaff: checked as boolean })
            }
            className="col-span-3"
          />
        </div>
        {/* Input para imagen */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Imagen
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="col-span-3"
          />
          {previewImage && (
            <div className="col-span-4">
              <p className="text-center">Previsualización:</p>
              <img
                src={previewImage}
                alt="Preview"
                className="mx-auto mt-2"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        {imageUploading && <p className="text-center">Subiendo imagen...</p>}
        <DialogFooter>
          <Button
            className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg"
            onClick={handlerEdit}
          >
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
