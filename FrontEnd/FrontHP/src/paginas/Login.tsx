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

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  console.log("Login component rendered");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit called");

    if (!email || !password) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      console.log("returning because of empty fields");
      return;
    }

    try {
      console.log("making request to /user/login");
      const response = await clienteAxios.post("/user/login", {
        email,
        password,
      });

      const { data } = response;
      if (!data) {
        throw new Error("No se ha podido iniciar la sesión");
      }

      const { token } = data;
      if (!token) {
        throw new Error("No se ha podido iniciar la sesión");
      }

      console.log("setting token in local storage");
      localStorage.setItem("token", token);
      console.log(data);
      setAuth(data);
      navigate("/admin");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.msg) {
          setAlerta({
            msg: error.response.data.msg,
            error: true,
          });
        } else {
          setAlerta({
            msg: "Ha ocurrido un error, inténtelo de nuevo",
            error: true,
          });
        }
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
          Iniciar {""}
          <span className="text-black">Sesión</span>
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

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
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
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
