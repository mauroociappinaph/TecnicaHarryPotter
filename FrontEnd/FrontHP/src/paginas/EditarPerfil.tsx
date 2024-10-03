import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import { AlertaType } from "../types/AlertType";

interface Perfil {
  _id?: string;
  nombre?: string;
  email?: string;
}

const EditarPerfil: React.FC = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState<Perfil>({} as Perfil);
  const [alerta, setAlerta] = useState<AlertaType | null>(null);

  useEffect(() => {
    if (auth) {
      setPerfil(auth);
    }
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nombre, email } = perfil ?? {};

    // Validar que nombre y email no estén vacíos
    if (!nombre || !email) {
      setAlerta({
        msg: "Email y Nombre son obligatorios",
        error: true,
      });
      return;
    }

    try {
      if (!actualizarPerfil) {
        throw new Error(
          "No se ha proporcionado un método para actualizar el perfil"
        );
      }

      const resultado = await actualizarPerfil(perfil);
      if (!resultado) {
        throw new Error("No se ha podido actualizar el perfil");
      }

      setAlerta({
        msg: "Perfil actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta(null);
      }, 3000);
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      setAlerta({
        msg: "Error al actualizar el perfil",
        error: true,
      });
    }
  };

  const { msg = "", error = false } = alerta || {};

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}
        <span className="text-indigo-600 font-bold">Información aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={{ msg, error }} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Email</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
