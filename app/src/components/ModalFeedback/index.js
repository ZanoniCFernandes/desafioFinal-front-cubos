import "./styles.css";
import BotaoFechar from "../../assets/botao-fechar.svg";
import Atencao from "../../assets/icone-circulo-atencao.svg";
import Erro from "../../assets/icone-circulo-x.svg";
import Sucesso from "../../assets/icone-circulo-check.svg";
import { useClientes } from "../../contexts/ClientesContexto";

function ModalFeedback({ texto, tipo }) {
  const { operarModalFeedback } = useClientes();

  setTimeout(() => {
    operarModalFeedback();
  }, 2500);

  return (
    <div className={`container-feedback ${tipo}`}>
      <img
        src={tipo === "atencao" ? Atencao : tipo === "erro" ? Erro : Sucesso}
        alt="icone"
      />
      <span>{texto}</span>
      <img
        onClick={() => operarModalFeedback()}
        className="botao-fechar-feedback"
        src={BotaoFechar}
        alt="fechar"
      />
      <div className="botoes-feedback"></div>
    </div>
  );
}

export default ModalFeedback;
