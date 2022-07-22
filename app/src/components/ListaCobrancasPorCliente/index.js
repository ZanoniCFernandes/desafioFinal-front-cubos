import { addHours, format } from "date-fns";
import BotaoEditar from "../../assets/botao-editar.svg";
import BotaoExcluir from "../../assets/botao-excluir.svg";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import definirValorEmReais from "../../utils/valorEmReais";
import verificarVencimento from "../../utils/verificarVencimento";
import "./styles.css";

function ListaCobrancasPorCliente({ cobranca, cliente }) {
  const { cobranca_id, vencimento, valor, status, descricao } = cobranca;
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
      cliente: cliente.nome,
    });
  }

  function abrirEdicao() {
    operarModalEdicaoCobranca({
      ...cobranca,
      cliente: cliente.nome,
    });
  }

  return (
    <div className="linha-cobrancas-detalhe">
      <span className="linha-cobrancas-coluna1" onClick={() => abrirDetalhe()}>
        {cobranca_id}
      </span>
      <span className="linha-cobrancas-coluna2" onClick={() => abrirDetalhe()}>
        {data}
      </span>
      <span className="linha-cobrancas-coluna3" onClick={() => abrirDetalhe()}>
        {valorEmReais}
      </span>
      <div className="linha-cobrancas-coluna4" onClick={() => abrirDetalhe()}>
        <span className={`linha-status ${selecionarStatus(status)}`}>
          {selecionarStatus(status)}
        </span>
      </div>
      <span className="linha-cobrancas-coluna5" onClick={() => abrirDetalhe()}>
        {descricao}
      </span>
      <div className="linha-cobrancas-coluna6">
        <img
          src={BotaoEditar}
          alt="editar cobranca"
          onClick={() => abrirEdicao()}
        />
        <img
          src={BotaoExcluir}
          alt="excluir cobranca"
          onClick={() => operarModalExcluirCobranca(cobranca)}
        />
      </div>
    </div>
  );
}

export default ListaCobrancasPorCliente;
