import Formulario from "../components/Formulario";
import { useState } from "react";
export default function CrearPersonaje() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        type="button"
        className="bg-yellow-400 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 hover:bg-yellow-500"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? "Ocultar Formulario" : "Crear Personaje"}
      </button>

      {mostrarFormulario && (
        <div className="w-full md:w-1/2 lg:w-2/5">
          <Formulario />
        </div>
      )}
    </div>
  );
}
