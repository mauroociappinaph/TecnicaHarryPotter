import { useState, useEffect, createContext, ReactNode } from "react";
import clienteAxios from "../config/axios";

// Definir tipos para el contexto
interface AuthContextProps {
  auth: AuthProps | null;
  setAuth: (auth: AuthProps | null) => void;
  cargando: boolean;
  cerrarSesion: () => void;
  actualizarPerfil: (
    datos: AuthProps
  ) => Promise<{ msg: string; error?: boolean }>;
  guardarPassword: (
    datos: PasswordProps
  ) => Promise<{ msg: string; error?: boolean }>;
}

// Definir el tipo de los datos de autenticación
interface AuthProps {
  _id: string;
  nombre: string;
  email: string;
  [key: string]: unknown;
}

// Definir el tipo de los datos de la contraseña
interface PasswordProps {
  password_actual: string;
  password_nuevo: string;
}

// Crear el contexto con un valor inicial
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Error desconocido");
        }
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
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Error desconocido");
      }

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
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Error desconocido");
      }

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
