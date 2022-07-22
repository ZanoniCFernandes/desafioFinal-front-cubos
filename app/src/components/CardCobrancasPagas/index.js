import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import definirValorEmReais from "../../utils/valorEmReais";
import "./styles.css";

function CardCobrancasPagas() {
  const { cobrancasLocal } = useCobrancas();
  const [cobrancasPagas, setCobrancasPagas] = useState([]);
  const [cobrancasPagasLocal, setCobrancasPagasLocal] = useState([]);

  function separarCobrancas() {
    const resultadoPagas = cobrancasLocal.filter(
      (cobranca) => cobranca.status === "pago"
    );
    setCobrancasPagas(resultadoPagas);
    setCobrancasPagasLocal(resultadoPagas.slice(0, 3));
  }

  useEffect(() => {
    separarCobrancas();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card card-cobrancas">
      <div className="card-superior">
        <h3>Cobranças Pagas</h3>
        <div className="contador pago">
          <h4>{cobrancasPagas.length}</h4>
        </div>
      </div>
      <div className="card-medio">
        <h4>Cliente</h4>
        <h4>ID da cob.</h4>
        <h4>Valor</h4>
      </div>
      <div className="card-inferior">
        {cobrancasPagasLocal.map((cobranca) => (
          <div key={cobranca.cobranca_id} className="entrada">
            <span>{cobranca.cliente}</span>
            <span>{cobranca.cobranca_id}</span>
            <span>{definirValorEmReais(cobranca.valor)}</span>
          </div>
        ))}
      </div>
      <div className="listar">
        <Link to="/cobrancas" state={"pagas"} className="ver-todos">
          Ver todos
        </Link>
      </div>
    </div>
  );
}

export default CardCobrancasPagas;
