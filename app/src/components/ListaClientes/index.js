import "./styles.css";
import BotaoCobranca from "../../assets/botao-criar-cobranca.svg";
import { Link } from "react-router-dom";
import { useClientes } from "../../contexts/ClientesContexto";
import formatarCPF from "../../utils/formatarCpf";


function ListaClientes({ cliente }) {
  //eslint-disable-next-line
  const { id, nome, cpf, email, telefone, status } = cliente;
  const { operarModalCobranca, setClienteModal } = useClientes();

  function abrirModalCobranca() {
    setClienteModal(cliente)
    operarModalCobranca()
  }

  return (
    <div className="linha-clientes">
      <Link
        to="/clientes/detalhe-cliente"
        state={cliente}
        className="linha-clientes-coluna1"
      >
        {nome}
      </Link>
      <span className="linha-clientes-coluna2">{formatarCPF(cpf)}</span>
      <span className="linha-clientes-coluna3">{email}</span>
      <span className="linha-clientes-coluna4">{telefone}</span>
      <span
        className={
          status === "Inadimplente"
            ? "linha-clientes-coluna5 inadimplente"
            : "linha-clientes-coluna5 em-dia"
        }
      >
        {status}
      </span>
      <div className="linha-clientes-coluna6">
        <img
          src={BotaoCobranca}
          alt="criar cobrança"
          onClick={() => abrirModalCobranca()}
        />
      </div>
    </div>
  );
}

export default ListaClientes;
