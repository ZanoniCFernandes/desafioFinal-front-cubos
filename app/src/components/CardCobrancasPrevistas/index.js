import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import definirValorEmReais from "../../utils/valorEmReais";
import verificarVencimento from "../../utils/verificarVencimento";
import "./styles.css";

function CardCobrancasPrevistas() {
  const { cobrancasLocal } = useCobrancas();
  const [cobrancasPendentes, setCobrancasPendentes] = useState([{}]);
  const [cobrancasPendentesLocal, setCobrancasPendentesLocal] = useState([{}]);

  function separarCobrancas() {
    const resultadoPendentes = cobrancasLocal.filter(
      (cobranca) =>
        cobranca.status === "pendente" &&
        verificarVencimento(cobranca.vencimento)
    );
    setCobrancasPendentes(resultadoPendentes);
    setCobrancasPendentesLocal(resultadoPendentes.slice(0, 3));
  }

  useEffect(() => {
    separarCobrancas();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card card-cobrancas">
      <div className="card-superior">
        <h3>Cobranças Previstas</h3>
        <div className="contador previsto">
          <h4>{cobrancasPendentes.length}</h4>
        </div>
      </div>
      <div className="card-medio">
        <h4>Cliente</h4>
        <h4>ID da cob.</h4>
        <h4>Valor</h4>
      </div>
      <div className="card-inferior">
        {cobrancasPendentesLocal.map((cobranca) => (
          <div key={cobranca.cobranca_id} className="entrada">
            <span>{cobranca.cliente}</span>
            <span>{cobranca.cobranca_id}</span>
            <span>{definirValorEmReais(cobranca.valor)}</span>
          </div>
        ))}
      </div>
      <div className="listar">
        <Link to="/cobrancas" state={"pendentes"} className="ver-todos">
          Ver todos
        </Link>
      </div>
    </div>
  );
}

export default CardCobrancasPrevistas;
