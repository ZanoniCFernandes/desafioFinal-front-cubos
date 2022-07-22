import Fechar from "../../assets/botao-fechar.svg";
import IconeCobrancas from "../../assets/icone-cobrancas.svg";
import "./styles.css";
import { useCobrancas } from "../../contexts/CobrancasContexto";

function ModalDetalheCobranca() {
  const { operarModalDetalheCobranca, cobrancaDetalhe } = useCobrancas();

  return (
    <div className="container-detalhe-cobranca">
      <div className="modal-detalhe-cobranca">
        <div className="botao-fechar">
          <img
            onClick={() => operarModalDetalheCobranca()}
            src={Fechar}
            alt="fechar"
          />
        </div>
        <div className="modal-titulo">
          <img src={IconeCobrancas} alt="icone cobranças" />
          <h1>Detalhe da Cobrança</h1>
        </div>
        <div className="modal-infos">
          <div className="info-detalhe-cobranca">
            <span className="titulo-detalhe-cobranca">Nome</span>
            <span>{cobrancaDetalhe.cliente}</span>
          </div>
          <div className="info-detalhe-cobranca">
            <span className="titulo-detalhe-cobranca">Descrição</span>
            <span>{cobrancaDetalhe.descricao}</span>
          </div>

          <div className="detalhe-dividido">
            <div className="info-detalhe-cobranca">
              <span className="titulo-detalhe-cobranca">Vencimento</span>
              <span>{cobrancaDetalhe.vencimento}</span>
            </div>
            <div className="info-detalhe-cobranca">
              <span className="titulo-detalhe-cobranca">Valor</span>
              <span>{cobrancaDetalhe.valor}</span>
            </div>
          </div>
          <div className="detalhe-dividido">
            <div className="info-detalhe-cobranca">
              <span className="titulo-detalhe-cobranca">ID cobrança</span>
              <span>{cobrancaDetalhe.cobranca_id}</span>
            </div>
            <div className="info-detalhe-cobranca">
              <span className="titulo-detalhe-cobranca">Status</span>
              <span className={`detalhe-status ${cobrancaDetalhe.status}`}>
                {cobrancaDetalhe.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetalheCobranca;
