import { useEffect, useState } from "react";
// import BotaoFiltro from "../../assets/botao-filtro.svg";
import { useLocation, useNavigate } from "react-router-dom";
import IconeOrdenar from "../../assets/clientes-ordenar.svg";
import IconeCobrancas from "../../assets/icone-cobrancas.svg";
import IconePesquisa from "../../assets/icone-pesquisa.svg";
import Cabecalho from "../../components/Cabecalho";
import Barra from "../../components/Lateral";
import ListaCobrancas from "../../components/ListaCobrancas";
import ModalExcluirCobranca from "../../components/ModalExcluirCobranca";
import ModalDetalheCobranca from "../../components/ModalDetalheCobranca";
import ModalEditarCobranca from "../../components/ModalEditarCobranca";
import ErroSemResultadoBusca from "../../components/ErroSemResultadoBusca";
import ModalFeedback from "../../components/ModalFeedback";
import "./styles.css";
import { useClientes } from "../../contexts/ClientesContexto";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import { useAutenticacao } from "../../contexts/AutenticacaoContexto";

function Cobrancas() {
  const navigate = useNavigate();
  const location = useLocation();
  const estadoFiltro = location.state;
  const [ordenacao, setOrdenacao] = useState("asc");
  const [termoDeBusca, setTermoDeBusca] = useState("");
  // eslint-disable-next-line
  const {
    cobrancas,
    cobrancasLocal,
    setCobrancasLocal,
    buscarCobrancas,
    mostrarModalExcluirCobranca,
    mostrarModalDetalheCobranca,
    mostrarModalEdicaoCobranca,
  } = useCobrancas();
  const { token } = useAutenticacao();
  const { feedbackInfos } = useClientes();

  function ordenarCobrancas(ordenacao, campo) {
    const cobrancasOrdenacao = [...cobrancasLocal];
    if (campo === "id") {
      if (ordenacao === "asc" || ordenacao === "") {
        cobrancasOrdenacao.sort((a, b) => {
          return a.cobranca_id - b.cobranca_id;
        });
        setOrdenacao("desc");
      } else if (ordenacao === "desc") {
        cobrancasOrdenacao.sort((a, b) => {
          return b.cobranca_id - a.cobranca_id;
        });
        setOrdenacao("asc");
      }
    } else if (campo === "cliente") {
      if (ordenacao === "asc" || ordenacao === "") {
        cobrancasOrdenacao.sort((a, b) => {
          return a.cliente.localeCompare(b.cliente);
        });
        setOrdenacao("desc");
      } else if (ordenacao === "desc") {
        cobrancasOrdenacao.sort((a, b) => {
          return b.cliente.localeCompare(a.cliente);
        });
        setOrdenacao("asc");
      }
    }
    setCobrancasLocal([...cobrancasOrdenacao]);
  }

  function pesquisarClientes(e) {
    setTermoDeBusca(e.target.value);
  }

  useEffect(() => {
    if (token) {
      buscarCobrancas(token, estadoFiltro);
      return navigate("/cobrancas");
    } else {
      return navigate("/");
    }
    // eslint-disable-next-line
  }, []);



  useEffect(() => {
    const resultados = cobrancas.filter(
      (cobranca) =>
        cobranca.cliente.toLowerCase().includes(termoDeBusca.toLowerCase()) ||
        cobranca.cobranca_id.toString().includes(termoDeBusca)
    );
    setCobrancasLocal(resultados);
    // eslint-disable-next-line
  }, [termoDeBusca]);

  return (
    <div className="container-cobrancas">
      <div className="cobrancas-esquerda">
        <Barra pagina={"cobrancas"} />
      </div>
      <div className="cobrancas-direita">
        <Cabecalho pagina={"cobrancas"} />
        <div className="cobrancas-direita-superior">
          <div className="cobrancas-direita-superior-esquerda">
            <img src={IconeCobrancas} alt="icone-cobrancas" />
            <h1>Cobranças</h1>
          </div>
          <div className="cobrancas-direita-superior-direita">
            {/* <img src={BotaoFiltro} alt="botao-filtro" /> */}
            <div className="cobrancas-input">
              <input
                placeholder="Pesquisa"
                value={termoDeBusca}
                onChange={(e) => pesquisarClientes(e)}
              />
              <img src={IconePesquisa} alt="icone-lupa" />
            </div>
          </div>
        </div>
        <div className="cobrancas-direita-inferior">
          <div className="tabela-cobrancas">
            <div className="tabela-cobrancas-cabecalho">
              <div className="tabela-cobrancas-cabecalho-coluna-1">
                <img
                  src={IconeOrdenar}
                  alt="ordenar"
                  onClick={() => ordenarCobrancas(ordenacao, "cliente")}
                />
                <span>Cliente</span>
              </div>
              <div className="tabela-cobrancas-cabecalho-coluna-2">
                <img
                  src={IconeOrdenar}
                  alt="ordenar"
                  onClick={() => ordenarCobrancas(ordenacao, "id")}
                />
                <span>ID Cob.</span>
              </div>
              <div className="tabela-cobrancas-cabecalho-coluna-3">
                <span>Valor</span>
              </div>
              <div className="tabela-cobrancas-cabecalho-coluna-4">
                <span>Data de venc.</span>
              </div>
              <div className="tabela-cobrancas-cabecalho-coluna-5">
                <span>Status</span>
              </div>
              <div className="tabela-cobrancas-cabecalho-coluna-6">
                <span>Descrição</span>
              </div>
              <div className="tabela-cobrancas-cabecalho-coluna-7"></div>
            </div>
            <div className="tabela-cobrancas-linhas-container">
              {cobrancasLocal.length === 0 ? (
                <ErroSemResultadoBusca />
              ) : (
                cobrancasLocal.map((cobranca) => {
                  return (
                    <div
                      className="linha-tabela-cobrancas"
                      key={cobranca.cobranca_id}
                    >
                      <ListaCobrancas cobranca={cobranca} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        {mostrarModalExcluirCobranca && <ModalExcluirCobranca />}
        {mostrarModalDetalheCobranca && <ModalDetalheCobranca />}
        {mostrarModalEdicaoCobranca && <ModalEditarCobranca />}
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

export default Cobrancas;
