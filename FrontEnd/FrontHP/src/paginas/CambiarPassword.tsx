import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import { AlertaType } from "../types/AlertType";
import { PasswordType } from "../types/Password";

const CambiarPassword: React.FC = () => {
  const { guardarPassword } = useAuth();

  const [alerta, setAlerta] = useState<AlertaType>({ msg: "", error: false });
  const [password, setPassword] = useState<PasswordType>({
    password_actual: "",
    password_nuevo: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const respuesta = await guardarPassword(password);
      setAlerta({
        msg: respuesta.msg,
        error: false,
      });
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setAlerta({
        msg: "Error al cambiar la contraseña, inténtelo de nuevo",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="my-24">
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10 text-white">
        Cambiar Contraseña
      </h2>
      <p className="text-xl mt-5 mb-10 text-center text-white">
        Modifica tu {""}
        <span className="text-yellow-400 font-bold">Contraseña aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Contraseña Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_actual"
                placeholder="Escribe tu contraseña actual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password Nuevo
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_nuevo"
                placeholder="Escribe tu nueva contraseña"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              value="Actualizar Contraseña"
              className="bg-yellow-400 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CambiarPassword;
