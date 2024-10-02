import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { AlertaType } from "../types/AlertType";
import { AxiosError } from "axios"; // Importar AxiosError

const OlvidePassword = () => {
  const [email, setEmail] = useState<string>("");
  const [alerta, setAlerta] = useState<AlertaType | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || email.length < 6) {
      setAlerta({ msg: "El Email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/user/olvide-password", {
        email,
      });
      if (data?.msg) {
        setAlerta({ msg: data.msg, error: false });
      } else {
        throw new Error("Error al intentar recuperar la contraseña");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.msg) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      } else if (error instanceof Error) {
        setAlerta({
          msg: error.message || "Ha ocurrido un error, inténtelo de nuevo",
          error: true,
        });
      } else {
        setAlerta({
          msg: "Ha ocurrido un error desconocido, inténtelo de nuevo",
          error: true,
        });
      }
    }
  };

  const { msg } = alerta || {};

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta as AlertaType} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
