import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { AxiosError } from "axios";
import { AlertaType } from "../types/AlertType";
import { ResponseType } from "../types/ResponseType"; // Importar la interfaz

const NuevoPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [alerta, setAlerta] = useState<AlertaType>({ msg: "", error: false });
  const [tokenValido, setTokenValido] = useState<boolean>(false);
  const [passwordModificado, setPasswordModificado] = useState<boolean>(false);

  const params = useParams<{ token: string }>();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      if (!token) {
        setAlerta({
          msg: "No hay token",
          error: true,
        });
        return;
      }

      try {
        const response = await clienteAxios.get<ResponseType>(
          `/user/olvide-password/${token}`
        );

        if (!response.data) {
          throw new Error("No se ha podido verificar el token");
        }

        setAlerta({
          msg: "Coloca tu Nuevo Password",
          error: false,
        });
        setTokenValido(true);
      } catch (error) {
        let msg = "Error desconocido";
        if (error instanceof AxiosError && error.response) {
          msg = error.response.data?.msg || "Hubo un error con el enlace";
        } else if (error instanceof Error) {
          msg = error.message || "Ha ocurrido un error desconocido";
        }

        setAlerta({
          msg,
          error: true,
        });
      }
    };

    comprobarToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      setAlerta({
        msg: "El Password debe ser mínimo de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/user/olvide-password/${token}`;
      const { data } = await clienteAxios.post<ResponseType>(url, { password });
      if (!data) {
        throw new Error("No se ha podido guardar el password");
      }

      setAlerta({
        msg: data?.msg || "No se ha podido guardar el password",
        error: false,
      });
      setPasswordModificado(true);
    } catch (error) {
      let msg = "Error desconocido";
      if (error instanceof AxiosError && error.response) {
        msg = error.response.data?.msg || "Hubo un error con el enlace";
      } else if (error instanceof Error) {
        msg = error.message || "Ha ocurrido un error desconocido";
      }

      setAlerta({
        msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-yellow-400 font-black text-6xl">
          Restablece tu password {""}
          <span className="text-black">y no Pierdas Acceso</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nuevo Password
              </label>
              <input
                type="password"
                placeholder="Tu Nuevo Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Guardar Nuevo Password"
              className="bg-yellow-400 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-yellow-500 md:w-auto"
            />
          </form>
        )}

        {passwordModificado && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
