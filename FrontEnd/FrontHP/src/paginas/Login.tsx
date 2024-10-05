import { AxiosError } from "axios";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { AlertaType } from "../types/AlertType";
import useAuth from "../hooks/useAuth";
import LogoHogwarts from "../asset/6137929c4b96600004f676fe.png"; // Importa la imagen correctamente

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alerta, setAlerta] = useState<AlertaType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await clienteAxios.post("/user/login", {
        email,
        password,
      });
      const { data } = response;
      const { token } = data;

      localStorage.setItem("token", token);
      setAuth(data);
      navigate("/admin");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setAlerta({
          msg:
            error.response?.data?.msg ||
            "Ha ocurrido un error, inténtelo de nuevo",
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
    } finally {
      setIsLoading(false);
    }
  };

  const { msg } = alerta || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-screen p-10">
      <div className="hidden md:block">
        <img
          src={LogoHogwarts} // Usa la imagen importada
          alt="Hogwarts Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-yellow-400 font-black text-6xl text-center mb-6">
          Iniciar Sesión
        </h1>

        {msg && <Alerta alerta={alerta as AlertaType} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email de Registro"
              aria-label="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:border-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Tu Password"
              aria-label="Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:border-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-400 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:bg-yellow-500 md:w-auto flex items-center justify-center"
            disabled={isLoading}
          >
            Iniciar Sesión
          </button>
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvidé mi Password
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Login;
