import { useEffect, useState } from "react";
import IconeCobrancasPrevistas from "../../assets/icone-cobrancas-previstas.svg";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import obterValorTotal from "../../utils/somarValorCobranca";
import definirValorEmReais from "../../utils/valorEmReais";
import verificarVencimento from "../../utils/verificarVencimento";
import "./styles.css";

function ResumoCobrancasPrevistas() {
  const { cobrancasLocal } = useCobrancas();
  const [cobrancasPendentes, setCobrancasPendentes] = useState([{}]);

  function separarCobrancas() {
    const resultadoPendentes = cobrancasLocal.filter(
      (cobranca) =>
        cobranca.status === "pendente" &&
        verificarVencimento(cobranca.vencimento)
    );
    setCobrancasPendentes(resultadoPendentes);
  }

  useEffect(() => {
    separarCobrancas();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="resumo card-cobrancas previsto">
      <img src={IconeCobrancasPrevistas} alt="icone-cobrancas-previstas" />
      <div className="informacao">
        <h3>Cobranças Previstas</h3>
        <h2>{definirValorEmReais(obterValorTotal(cobrancasPendentes))}</h2>
      </div>
    </div>
  );
}

export default ResumoCobrancasPrevistas;
