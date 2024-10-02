import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { AxiosError } from "axios";
import { AlertaType } from "../types/AlertType";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(true);
  const [alerta, setAlerta] = useState<AlertaType | null>(null); // Inicializado como null

  const params = useParams<{ id: string }>();
  const { id } = params ?? {};

  useEffect(() => {
    if (!id) {
      setAlerta({
        msg: "No se ha proporcionado el id",
        error: true,
      });
      setCargando(false);
      return;
    }

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
          setAlerta({
            msg: error.response.data?.msg || "Error al confirmar la cuenta",
            error: true,
          });
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

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirmar Cuenta
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && alerta && <Alerta alerta={alerta} />}
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
