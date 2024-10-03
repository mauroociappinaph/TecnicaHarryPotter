export interface AuthContextProps {
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

export interface AuthProps {
    _id: string;
    nombre: string;
    email: string;
    [key: string]: unknown;
}

export interface PasswordProps {
    password_actual: string;
    password_nuevo: string;
}


interface AuthProviderProps {
    children: ReactNode;
}