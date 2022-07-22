import { useEffect, useState } from "react";
// import BotaoFiltro from "../../assets/botao-filtro.svg";
import { useLocation } from "react-router-dom";
import IconeClienteInativo from "../../assets/clientes-inativo.svg";
import IconeOrdenar from "../../assets/clientes-ordenar.svg";
import IconePesquisa from "../../assets/icone-pesquisa.svg";
import Cabecalho from "../../components/Cabecalho";
import ErroSemResultadoBusca from "../../components/ErroSemResultadoBusca";
import Barra from "../../components/Lateral";
import ListaClientes from "../../components/ListaClientes";
import AdicionarCliente from "../../components/ModalAdicionarCliente";
import AdicionarCobranca from "../../components/ModalAdicionarCobranca";
import ModalFeedback from "../../components/ModalFeedback";
import { useAutenticacao } from "../../contexts/AutenticacaoContexto";
import { useClientes } from "../../contexts/ClientesContexto";
import { useNavigate } from 'react-router-dom';
import "./styles.css";

function Clientes() {
  const navigate = useNavigate();
  const location = useLocation();
  const estadoFiltro = location.state;
  const { token } = useAutenticacao();
  const [termoDeBusca, setTermoDeBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("asc");
  const {
    clientes,
    clientesLocal,
    setClientesLocal,
    buscarClientes,
    operarModalCliente,
    mostrarModalCliente,
    mostrarModalCobranca,
    feedbackInfos,
  } = useClientes();

  function pesquisarClientes(e) {
    setTermoDeBusca(e.target.value);
  }

  function ordenarClientes(ordenarPor) {
    const clientesOrdenacao = [...clientesLocal];
    if (ordenarPor === "asc" || ordenarPor === "") {
      clientesOrdenacao.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
      });
      setOrdenacao("desc");
    } else if (ordenarPor === "desc") {
      clientesOrdenacao.sort((a, b) => {
        return b.nome.localeCompare(a.nome);
      });
      setOrdenacao("asc");
    }

    setClientesLocal([...clientesOrdenacao]);
  }

  useEffect(() => {
    if (token) {
      buscarClientes(token, estadoFiltro);
      return navigate("/clientes");
    } else {
      return navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const resultados = clientes.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(termoDeBusca.toLowerCase()) ||
        cliente.email.toLowerCase().includes(termoDeBusca.toLowerCase()) ||
        cliente.cpf.includes(termoDeBusca)
    );
    setClientesLocal(resultados);
    // eslint-disable-next-line
  }, [termoDeBusca]);

  return (
    <div className="container-clientes">
      <div className="clientes-esquerda">
        <Barra pagina={"clientes"} />
      </div>
      <div className="clientes-direita">
        <Cabecalho pagina={"clientes"} />
        <div className="clientes-direita-superior">
          <div className="clientes-direita-superior-esquerda">
            <img src={IconeClienteInativo} alt="icone-cliente" />
            <h1>Clientes</h1>
          </div>
          <div className="clientes-direita-superior-direita">
            <button onClick={() => operarModalCliente()}>
              + Adicionar Cliente
            </button>
            {/* <img src={BotaoFiltro} alt="botao-filtro" /> */}
            <div className="clientes-input">
              <input
                placeholder="Pesquisa"
                value={termoDeBusca}
                onChange={(e) => pesquisarClientes(e)}
              />
              <img src={IconePesquisa} alt="icone-lupa" />
            </div>
          </div>
        </div>
        <div className="clientes-direita-inferior">
          <div className="tabela">
            <div className="tabela-cabecalho">
              <div className="tabela-cabecalho-coluna-1">
                <img
                  src={IconeOrdenar}
                  alt="ordenar"
                  onClick={() => ordenarClientes(ordenacao)}
                />
                <span>Cliente</span>
              </div>
              <span className="tabela-cabecalho-coluna-2">CPF</span>
              <span className="tabela-cabecalho-coluna-3">E-mail</span>
              <span className="tabela-cabecalho-coluna-4">Telefone</span>
              <span className="tabela-cabecalho-coluna-5">Status</span>
              <span className="tabela-cabecalho-coluna-6">Criar Cobrança</span>
            </div>
            {clientesLocal.length === 0 ? (
              <ErroSemResultadoBusca />
            ) : (
              clientesLocal && (
                <div className="tabela-linhas-container">
                  {clientesLocal.map((cliente) => {
                    return (
                      <div key={cliente.id} className="linha-tabela-cliente">
                        <ListaClientes cliente={cliente} />
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
        {mostrarModalCliente && <AdicionarCliente />}
        {mostrarModalCobranca && (
          <AdicionarCobranca
          // buscarCobrancas={buscarCobrancas}
          />
        )}
        {feedbackInfos.aberto && (
          <ModalFeedback
            texto={feedbackInfos.texto}
            tipo={feedbackInfos.tipo}
          />
        )}
      </div>
    </div>
  );
}

export default Clientes;
