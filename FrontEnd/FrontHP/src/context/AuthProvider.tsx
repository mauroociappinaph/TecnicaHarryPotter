import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import {
  AuthContextProps,
  AuthProps,
  AuthProviderProps,
  PasswordProps,
} from "../types/AuthProvider";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState<AuthProps | null>(null);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await clienteAxios.get("/user/perfil", config);
        if (response.data) {
          setAuth(response.data);
        }
      } catch (error) {
        console.error("Error autenticando:", error);
        setAuth(null);
      } finally {
        setCargando(false);
      }
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  const actualizarPerfil = async (datos: AuthProps) => {
    if (!datos) {
      throw new Error("Datos de perfil no proporcionados");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return { msg: "No hay token", error: true };
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/user/perfil/${datos._id}`;
      const response = await clienteAxios.put(url, datos, config);

      if (!response.data) {
        throw new Error("No se ha podido actualizar el perfil");
      }

      return {
        msg: response.data.msg,
      };
    } catch (error: unknown) {
      console.error("Error actualizando perfil:", error);
      return {
        msg: "Error al actualizar el perfil",
        error: true,
      };
    }
  };

  const guardarPassword = async (datos: PasswordProps) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return { msg: "No hay token", error: true };
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "/user/actualizar-password";
      const response = await clienteAxios.put(url, datos, config);

      if (!response.data) {
        throw new Error("No se ha podido guardar el password");
      }

      return {
        msg: response.data.msg,
      };
    } catch (error: unknown) {
      // Handle any errors
      console.error("Error guardando password:", error);
      return {
        msg: "Error al guardar el password",
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
