import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header: React.FC = () => {
  const { cerrarSesion } = useAuth();
  const location = useLocation();

  return (
    <header className="py-10 bg-yellow-400">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-yellow-800 text-center">
          Harry Potter <span className="text-white font-black">API</span>
        </h1>

        <nav
          className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0"
          role="navigation"
          aria-label="Main Navigation"
        >
          <Link
            to="/admin"
            className={`text-white text-sm uppercase font-bold ${
              location.pathname === "/admin" ? "border-b-2 border-white" : ""
            }`}
            aria-label="Ir a Inicio"
          >
            Inicio
          </Link>
          <Link
            to="/admin/characters"
            className={`text-white text-sm uppercase font-bold ${
              location.pathname.startsWith("/admin/characters") &&
              location.pathname !== "/admin/characters/crearPersonaje"
                ? "border-b-2 border-white"
                : ""
            }`}
            aria-label="Ver Personajes"
          >
            Personajes
          </Link>
          <Link
            to="/admin/characters/crearPersonaje"
            className={`text-white text-sm uppercase font-bold ${
              location.pathname === "/admin/characters/crearPersonaje"
                ? "border-b-2 border-white"
                : ""
            }`}
            aria-label="Crear Personajes"
          >
            Crear Personaje
          </Link>
          <Link
            to="/admin/perfil"
            className={`text-white text-sm uppercase font-bold ${
              location.pathname === "/admin/perfil"
                ? "border-b-2 border-white"
                : ""
            }`}
            aria-label="Ver Perfil"
          >
            Perfil
          </Link>

          <button
            type="button"
            className="text-white text-sm uppercase font-bold"
            onClick={cerrarSesion}
            aria-label="Cerrar Sesión"
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
