import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./paginas/Login";
import Characters from "./paginas/Characters";
import CharacterId from "./paginas/CharacterId";
import Registrar from "./paginas/Registrar";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
//import { AuthProvider } from "./context/AuthProvider";

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="olvide-password/:token" element={<NuevoPassword />} />
          <Route path="characters" element={<Characters />} />
          <Route path="characters/:id" element={<CharacterId />} />
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="olvide-password/:token" element={<NuevoPassword />} />
          <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
        </Route>

        <Route path="/admin" element={<RutaProtegida />}>
          <Route index element={<AdministrarPacientes />} />
          <Route path="perfil" element={<EditarPerfil />} />
          <Route path="cambiar-password" element={<CambiarPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>

*/
