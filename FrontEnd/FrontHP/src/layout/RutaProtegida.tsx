import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "cargando..."; // Muestra un loader o mensaje mientras se carga

  console.log("Auth state:", auth); // Verifica el estado de auth
  console.log("Loading state:", cargando); // Verifica si está cargando

  return (
    <>
      <Header />
      {auth?._id ? ( // Si hay un ID, se muestra el Outlet
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" /> // Redirige si no hay usuario autenticado
      )}
      <Footer />
    </>
  );
};

export default RutaProtegida;
