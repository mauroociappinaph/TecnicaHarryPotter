import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/ui/spinner";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return <Spinner />;

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
