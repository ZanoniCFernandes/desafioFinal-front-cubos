import { useEffect, useState } from "react";
import IconeCobrancasPagas from "../../assets/icone-cobrancas-pagas.svg";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import obterValorTotal from "../../utils/somarValorCobranca";
import definirValorEmReais from "../../utils/valorEmReais";
import "./styles.css";

function ResumoCobrancasPagas() {
  const { cobrancasLocal } = useCobrancas();
  const [cobrancasPagas, setCobrancasPagas] = useState([{}]);

  function separarCobrancas() {
    const resultadoPagas = cobrancasLocal.filter(
      (cobranca) => cobranca.status === "pago"
    );
    setCobrancasPagas(resultadoPagas);
  }

  useEffect(() => {
    separarCobrancas();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="resumo card-cobrancas pago">
      <img src={IconeCobrancasPagas} alt="icone-cobrancas-pagas" />
      <div className="informacao">
        <h3>Cobranças Pagas</h3>
        <h2>{definirValorEmReais(obterValorTotal(cobrancasPagas))}</h2>
      </div>
    </div>
  );
}

export default ResumoCobrancasPagas;
