import { addHours, format } from "date-fns";
import BotaoEditar from "../../assets/botao-editar.svg";
import BotaoExcluir from "../../assets/botao-excluir.svg";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import definirValorEmReais from "../../utils/valorEmReais";
import verificarVencimento from "../../utils/verificarVencimento";
import "./styles.css";

function ListaCobrancas({ cobranca }) {
  const { cliente, cobranca_id, valor, vencimento, status, descricao } =
    cobranca;
  const data = format(addHours(new Date(vencimento), 3), "dd/MM/yyyy");
  const {
    operarModalExcluirCobranca,
    operarModalDetalheCobranca,
    operarModalEdicaoCobranca,
  } = useCobrancas();

  const valorEmReais = definirValorEmReais(valor);
  const statusAtual = selecionarStatus(status);

  function selecionarStatus(status) {
    if (status === "pago") {
      return "Paga";
    }

    if (status === "pendente" && verificarVencimento(vencimento)) {
      return "Pendente";
    } else {
      return "Vencida";
    }
  }

  function abrirDetalhe() {
    operarModalDetalheCobranca({
      ...cobranca,
      vencimento: data,
      valor: valorEmReais,
      status: statusAtual,
    });
  }

  function abrirEdicao() {
    operarModalEdicaoCobranca({
      ...cobranca,
      cliente,
    });
  }

  return (
    <div className="linha-cobrancas">
      <div className="linha-cobrancas coluna1" onClick={() => abrirDetalhe()}>
        <span>{cliente}</span>
      </div>
      <div className="linha-cobrancas coluna2" onClick={() => abrirDetalhe()}>
        <span>{cobranca_id}</span>
      </div>
      <div className="linha-cobrancas coluna3" onClick={() => abrirDetalhe()}>
        <span>{valorEmReais}</span>
      </div>
      <div className="linha-cobrancas coluna4" onClick={() => abrirDetalhe()}>
        <span>{data}</span>
      </div>
      <div className="linha-cobrancas coluna5" onClick={() => abrirDetalhe()}>
        <span className={`linha-status ${selecionarStatus(status)}`}>
          {selecionarStatus(status)}
        </span>
      </div>
      <div className="linha-cobrancas coluna6" onClick={() => abrirDetalhe()}>
        <span>{descricao}</span>
      </div>
      <div className="linha-cobrancas coluna7">
        <img
          src={BotaoEditar}
          alt="editar cobrança"
          onClick={() => abrirEdicao()}
        />
        <img
          src={BotaoExcluir}
          alt="excluir cobrança"
          onClick={() => operarModalExcluirCobranca(cobranca)}
        />
      </div>
    </div>
  );
}

export default ListaCobrancas;
