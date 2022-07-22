import { useState } from "react";
import Fechar from "../../assets/botao-fechar.svg";
import Advertencia from "../../assets/icone-advertencia.svg";
import { useAutenticacao } from "../../contexts/AutenticacaoContexto";
import { useClientes } from "../../contexts/ClientesContexto";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import instanciaAxios from "../../services/api";
import veririficarVencimento from "../../utils/verificarVencimento";
import "./styles.css";

function ModalExcluirCobranca({ atualizarCobrancasCliente }) {
  const {
    operarModalExcluirCobranca,
    cobrancaExcluir,
    setCobrancaExcluir,
    buscarCobrancas,
  } = useCobrancas();
  const { operarModalFeedback } = useClientes();
  const { token } = useAutenticacao();
  // eslint-disable-next-line
  const [aviso, setAviso] = useState("");

  async function excluirCobranca(e) {
    e.preventDefault();

    if (
      cobrancaExcluir.status !== "pendente" ||
      !veririficarVencimento(cobrancaExcluir.vencimento)
    ) {
      setCobrancaExcluir({});
      operarModalExcluirCobranca();
      setTimeout(() => {
        operarModalFeedback("Esta cobrança não pode ser excluída!", "erro");
      }, 1000);
      return;
    }

    try {
      await instanciaAxios.delete(
        `/deletar-cobranca/${cobrancaExcluir.cobranca_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (atualizarCobrancasCliente) {
        atualizarCobrancasCliente();
      } else {
        buscarCobrancas(token);
      }

      setCobrancaExcluir({});
      operarModalExcluirCobranca();
      setTimeout(() => {
        operarModalFeedback("Cobrança excluída com sucesso", "sucesso");
      }, 1000);
    } catch (error) {
      setAviso(error.response.data);
      setTimeout(() => {
        operarModalFeedback("Esta cobrança não pode ser excluída!", "erro");
      }, 1000);
      operarModalExcluirCobranca();
    }
  }

  return (
    <div className="container-excluir-cobrancas">
      <div className="modal-excluir-cobrancas">
        <div className="botao-fechar">
          <img
            onClick={() => operarModalExcluirCobranca()}
            src={Fechar}
            alt="fechar"
          />
        </div>
        <div className="modal-principal">
          <img src={Advertencia} alt="icone-advertência" />
          <h3>Tem certeza que deseja excluir esta cobrança?</h3>
        </div>
        <div className="modal-excluir-botoes">
          <button
            type="button"
            className="excluir-confirmar"
            onClick={(e) => excluirCobranca(e)}
          >
            Sim
          </button>
          <button
            type="button"
            onClick={() => operarModalExcluirCobranca()}
            className="excluir-cancelar"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalExcluirCobranca;
