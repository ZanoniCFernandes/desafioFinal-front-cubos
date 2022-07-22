import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import DetalheCliente from "./pages/DetalheCliente";
import Cobrancas from "./pages/Cobrancas";
import Entrar from "./pages/Entrar";
import Cadastrar from "./pages/Cadastrar";
import { Outlet, Navigate, Route, Routes } from "react-router-dom";
import { ClientesProvider } from "./contexts/ClientesContexto";
import { CobrancasProvider } from "./contexts/CobrancasContexto";
import { AutenticacaoProvider, useAutenticacao } from './contexts/AutenticacaoContexto';
// eslint-disable-next-line
import { pegarLocalItem } from "./utils/localStorage";

function RotasProtegidas({ redirectTo }) {
  // const token = pegarLocalItem("token");
  const { token } = useAutenticacao();
  const usuarioAutenticado = token;
  return usuarioAutenticado ? <Outlet /> : <Navigate to={redirectTo} />;
}

function RotasProjeto() {

  return (
    <AutenticacaoProvider>
      <ClientesProvider>
        <CobrancasProvider>
          <Routes>
            <Route path="/">
              <Route path="/" element={<Entrar />} />
              <Route path="/entrar" element={<Entrar />} />
            </Route>

            <Route path="/cadastrar" element={<Cadastrar />} />

            <Route element={<RotasProtegidas redirectTo="/" />}>
              <Route path="/home" element={<Home />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/clientes/detalhe-cliente" element={<DetalheCliente />} />
              <Route path="/cobrancas" element={<Cobrancas />} />
            </Route>
          </Routes>
        </CobrancasProvider>
      </ClientesProvider>
    </AutenticacaoProvider>
  );
}

export default RotasProjeto;
