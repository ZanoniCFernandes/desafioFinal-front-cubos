import "./styles.css";
import ResumoCobrancasPagas from "../../components/ResumoCobrancasPagas";
import ResumoCobrancasVencidas from "../../components/ResumoCobrancasVencidas";
import ResumoCobrancasPrevistas from "../../components/ResumoCobrancasPrevistas";
import CardCobrancasPagas from "../../components/CardCobrancasPagas";
import CardCobrancasVencidas from "../../components/CardCobrancasVencidas";
import CardCobrancasPrevistas from "../../components/CardCobrancasPrevistas";
import CardClientesInadimplentes from "../../components/CardClientesInadimplentes";
import CardClientesAdimplentes from "../../components/CardClientesAdimplentes";
import Backdrop from "../../components/BackdropLoading";
import Cabecalho from "../../components/Cabecalho";
import Barra from "../../components/Lateral";
import { useEffect } from "react";
import { useAutenticacao } from "../../contexts/AutenticacaoContexto";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import { useClientes } from "../../contexts/ClientesContexto";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const { token } = useAutenticacao();
  const { buscarCobrancas, backdrop } = useCobrancas();
  const { buscarClientes } = useClientes();

  useEffect(() => {
    if (token) {
      buscarCobrancas(token);
      buscarClientes(token);
      return navigate("/home");
    } else {
      return navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-home">
      <div className="home-esquerda">
        <Barra pagina={"home"} />
      </div>
      <div className="home-direita">
        <Cabecalho pagina={"home"} />
        {!backdrop && (
          <div className="home-direita-detalhes">
            <div className="home-direita-superior">
              <ResumoCobrancasPagas />
              <ResumoCobrancasVencidas />
              <ResumoCobrancasPrevistas />
            </div>
            <div className="home-direita-medio">
              <CardCobrancasPagas />
              <CardCobrancasVencidas />
              <CardCobrancasPrevistas />
            </div>
            <div className="home-direita-inferior">
              <CardClientesInadimplentes />
              <CardClientesAdimplentes />
            </div>
          </div>
        )}
      </div>
      {backdrop && <Backdrop />}
    </div>
  );
}

export default Main;
