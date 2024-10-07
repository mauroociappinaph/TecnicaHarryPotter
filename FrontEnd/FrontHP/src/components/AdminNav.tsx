import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

const AdminNav = () => {
  return (
    <Tabs defaultValue="perfil">
      <TabsList className="flex justify-center items-center gap-3">
        <TabsTrigger value="perfil">
          <Link
            to="/admin/perfil"
            className="font-bold uppercase text-gray-500 hover:text-yellow-500"
          >
            Perfil
          </Link>
        </TabsTrigger>
        <TabsTrigger value="cambiar-password">
          <Link
            to="/admin/cambiar-password"
            className="font-bold uppercase text-gray-500 hover:text-yellow-500"
          >
            Cambiar Contraseña
          </Link>
        </TabsTrigger>
        <TabsTrigger value="cambiar-password">
          <Link
            to="/admin/borrar-cuenta"
            className="font-bold uppercase text-gray-500 hover:text-yellow-500"
          >
            Borrar Cuenta
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AdminNav;
