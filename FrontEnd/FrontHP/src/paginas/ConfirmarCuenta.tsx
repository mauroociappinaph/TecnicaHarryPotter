import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { AxiosError } from "axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const { id } = useParams();
  const [alerta, setAlerta] = useState<{ msg: string; error: boolean } | null>(
    null
  );
  const [cargando, setCargando] = useState(true);
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        if (!id) {
          throw new Error("No se ha proporcionado el id");
        }

        const url = `/user/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);

        if (!data || !data.msg) {
          throw new Error("No se ha podido confirmar la cuenta");
        }

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          // No manejar el error de token no válido
          if (error.response.data.msg !== "Token no válido") {
            setAlerta({
              msg: error.response.data?.msg || "Error al confirmar la cuenta",
              error: true,
            });
          }
        } else if (error instanceof Error) {
          setAlerta({
            msg: error.message,
            error: true,
          });
        } else {
          setAlerta({
            msg: "Ha ocurrido un error desconocido, inténtelo de nuevo",
            error: true,
          });
        }
      } finally {
        setCargando(false);
      }
    };

    confirmarCuenta();
  }, [id]);

  if (cargando) {
    return <div>Cargando...</div>; // O un loader que prefieras
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu {""}
          <span className="text-black">Cuenta</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alerta && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
