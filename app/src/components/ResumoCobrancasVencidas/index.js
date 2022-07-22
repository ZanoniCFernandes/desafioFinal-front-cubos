import { useEffect, useState } from "react";
import IconeCobrancasVencidas from "../../assets/icone-cobrancas-vencidas.svg";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import obterValorTotal from "../../utils/somarValorCobranca";
import definirValorEmReais from "../../utils/valorEmReais";
import verificarVencimento from "../../utils/verificarVencimento";
import "./styles.css";

function ResumoCobrancasVencidas() {
  const { cobrancasLocal } = useCobrancas();
  const [cobrancasVencidas, setCobrancasVencidas] = useState([{}]);

  function separarCobrancas() {
    const resultadoVencidas = cobrancasLocal.filter(
      (cobranca) =>
        cobranca.status === "pendente" &&
        !verificarVencimento(cobranca.vencimento)
    );
    setCobrancasVencidas(resultadoVencidas);
  }

  useEffect(() => {
    separarCobrancas();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="resumo card-cobrancas vencido">
      <img src={IconeCobrancasVencidas} alt="icone-cobrancas-vencidas" />
      <div className="informacao">
        <h3>Cobranças Vencidas</h3>
        <h2>{definirValorEmReais(obterValorTotal(cobrancasVencidas))}</h2>
      </div>
    </div>
  );
}

export default ResumoCobrancasVencidas;
