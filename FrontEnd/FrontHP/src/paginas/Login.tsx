import { AxiosError } from "axios";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { AlertaType } from "../types/AlertType";
import useAuth from "../hooks/useAuth";

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
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Iniciar <span className="text-black">Sesión</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
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
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
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
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-800 md:w-auto flex items-center justify-center"
            disabled={isLoading}
          ></button>
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
    </>
  );
};

export default Login;
