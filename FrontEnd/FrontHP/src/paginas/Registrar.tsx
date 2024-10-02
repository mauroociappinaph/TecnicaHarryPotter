import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { AxiosError } from "axios";
import { AlertaType } from "../types/AlertType";

const Registrar = () => {
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repetirPassword, setRepetirPassword] = useState<string>("");
  const [alerta, setAlerta] = useState<AlertaType | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const campos = [nombre, email, password, repetirPassword];
    const campoVacio = campos.find((campo) => campo === "");
    if (campoVacio) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Los Password no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El Password es muy corto, agrega mínimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta(null);

    try {
      const response = await clienteAxios.post("/user", {
        nombre,
        email,
        password,
      });
      if (response.status !== 201) {
        setAlerta({
          msg: response.data?.msg || "Error al crear el usuario",
          error: true,
        });
        return;
      }

      setAlerta({
        msg: "Creado Correctamente, revisa tu email",
        error: false,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        setAlerta({
          msg: error.response.data?.msg || "Error al crear el usuario",
          error: true,
        });
      } else {
        console.error("Error desconocido");
        setAlerta({
          msg: "Ha ocurrido un error desconocido, inténtelo de nuevo",
          error: true,
        });
      }
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu {""}
          <span className="text-black">Cuenta </span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alerta && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

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

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvidé mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
