import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";
import Login from "./paginas/Login";
import Characters from "./paginas/Characters";
import CharacterId from "./paginas/CharacterId";
import Registrar from "./paginas/Registrar";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import AdministrarCharacters from "./paginas/AdministrarCharacters";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="characters/:id" element={<CharacterId />} />

            <Route />
          </Route>

          <Route path="/admin" element={<RutaProtegida />}>
            <Route index element={<AdministrarCharacters />} />
            <Route path="charactersAdmin" element={<AdministrarCharacters />} />
            <Route path="characters" element={<Characters />} />
          </Route>
        </Routes>
      </AuthProvider>
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
