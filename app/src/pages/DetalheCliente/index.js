import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import IconeClienteInativo from "../../assets/clientes-inativo.svg";
import IconeOrdenar from "../../assets/clientes-ordenar.svg";
import IconeEditar from "../../assets/icone-editar.svg";
import Cabecalho from "../../components/Cabecalho";
import Barra from "../../components/Lateral";
import ListaCobrancasPorCliente from "../../components/ListaCobrancasPorCliente";
import api from "../../services/api";
import { pegarLocalItem } from "../../utils/localStorage";
import "./styles.css";
import ModalEditarCliente from "../../components/ModalEditarCliente";
import ModalAdicionarCobranca from "../../components/ModalAdicionarCobranca";
import ModalExcluirCobranca from "../../components/ModalExcluirCobranca";
import ModalDetalheCobranca from "../../components/ModalDetalheCobranca";
import ModalEditarCobranca from "../../components/ModalEditarCobranca";
import ModalFeedback from "../../components/ModalFeedback";
import { useClientes } from "../../contexts/ClientesContexto";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import formatarCPF from "../../utils/formatarCpf";

function DetalheCliente() {
  const location = useLocation();
  const token = pegarLocalItem("token");
  const cliente = location.state;
  const [clienteLocal, setClienteLocal] = useState();
  const [ordenacao1, setOrdenacao1] = useState("");
  const [ordenacao2, setOrdenacao2] = useState("");
  const [cobrancasCliente, setCobrancasCliente] = useState();

  const {
    feedbackInfos,
    operarModalCliente,
    mostrarModalCliente,
    operarModalCobranca,
    mostrarModalCobranca,
    setClienteModal,
  } = useClientes();

  const {
    mostrarModalExcluirCobranca,
    mostrarModalDetalheCobranca,
    mostrarModalEdicaoCobranca,
  } = useCobrancas();

  useEffect(() => {
    atualizarCliente();
    buscarCobrancasCliente();
    // eslint-disable-next-line
  }, []);

  function abrirModalCobranca() {
    setClienteModal(cliente);
    operarModalCobranca();
  }

  function ordenarCobrancas(ordenacao, campo) {
    const localCobrancas = [...cobrancasCliente];
    if (campo === "id") {
      if (ordenacao === "asc" || ordenacao === "") {
        localCobrancas.sort((a, b) => {
          return a.cobranca_id - b.cobranca_id;
        });
        setOrdenacao1("desc");
      } else if (ordenacao === "desc") {
        localCobrancas.sort((a, b) => {
          return b.cobranca_id - a.cobranca_id;
        });
        setOrdenacao1("asc");
      }
    } else if (campo === "vencimento") {
      if (ordenacao === "asc" || ordenacao === "") {
        localCobrancas.sort((a, b) => {
          return a.vencimento.localeCompare(b.vencimento);
        });
        setOrdenacao2("desc");
      } else if (ordenacao === "desc") {
        localCobrancas.sort((a, b) => {
          return b.vencimento.localeCompare(a.vencimento);
        });
        setOrdenacao2("asc");
      }
    }
    setCobrancasCliente(localCobrancas);
  }

  async function atualizarCliente() {
    try {
      const { data } = await api.get(`/listar-cliente/${cliente.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClienteLocal(data.cliente);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function buscarCobrancasCliente() {
    try {
      const { data } = await api.get(`/listar-cobrancas/${cliente.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCobrancasCliente(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-detalhe">
      <div className="detalhe-esquerda">
        <Barra pagina={"clientes"} />
      </div>
      <div className="detalhe-direita">
        <Cabecalho pagina={"detalhe-cliente"} />
        {clienteLocal && (
          <div className="detalhe-direita-superior">
            <div className="detalhe-direita-superior-esquerda">
              <img src={IconeClienteInativo} alt="icone-cliente" />
              <h1>{clienteLocal.nome}</h1>
            </div>
            <div className="detalhe-direita-superior-direita"></div>
          </div>
        )}
        {clienteLocal && (
          <div className="detalhe-direita-inferior">
            <div className="dados-cliente">
              <div className="dados-cabecalho">
                <h3>Dados do cliente</h3>
                <button
                  onClick={() => operarModalCliente()}
                  className="botao editar-cliente"
                >
                  <img src={IconeEditar} alt="editar" />
                  Editar Cliente
                </button>
              </div>
              <div>
                <div className="detalhes-linha linha-um">
                  <div>
                    <h4>E-mail</h4>
                    <span>{clienteLocal.email}</span>
                  </div>
                  <div>
                    <h4>Telefone</h4>
                    <span>{clienteLocal.telefone}</span>
                  </div>
                  <div>
                    <h4>CPF</h4>
                    <span>{formatarCPF(clienteLocal.cpf)}</span>
                  </div>
                </div>
                <div className="detalhes-linha linha-dois">
                  <div>
                    <h4>Endereço</h4>
                    <span>{clienteLocal.logradouro}</span>
                  </div>
                  <div>
                    <h4>Bairro</h4>
                    <span>{clienteLocal.bairro}</span>
                  </div>
                  <div>
                    <h4>Complemento</h4>
                    <span>{clienteLocal.complemento}</span>
                  </div>
                  <div>
                    <h4>CEP</h4>
                    <span>{clienteLocal.cep}</span>
                  </div>
                  <div>
                    <h4>Cidade</h4>
                    <span>{clienteLocal.cidade}</span>
                  </div>
                  <div>
                    <h4>UF</h4>
                    <span>{clienteLocal.estado}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cobrancas-cliente">
              <div className="dados-cabecalho">
                <h3>Cobranças do cliente</h3>
                <button
                  onClick={() => abrirModalCobranca()}
                  className="botao adicionar-cobranca"
                >
                  + Nova Cobrança
                </button>
              </div>
              <div className="cobrancas-tabela">
                <div className="cobrancas-cabecalho">
                  <div className="cobrancas-cabecalho-coluna-1">
                    <img
                      src={IconeOrdenar}
                      alt="ordenar"
                      onClick={() => ordenarCobrancas(ordenacao1, "id")}
                    />
                    <span>ID Cob.</span>
                  </div>
                  <div className="cobrancas-cabecalho-coluna-2">
                    <img
                      src={IconeOrdenar}
                      alt="ordenar"
                      onClick={() => ordenarCobrancas(ordenacao2, "vencimento")}
                    />
                    <span>Data de venc.</span>
                  </div>
                  <span className="cobrancas-cabecalho-coluna-3">Valor</span>
                  <span className="cobrancas-cabecalho-coluna-4">Status</span>
                  <span className="cobrancas-cabecalho-coluna-5">
                    Descrição
                  </span>
                  <span className="cobrancas-cabecalho-coluna-6"></span>
                </div>
                <div className="cobrancas-linhas-container">
                  {cobrancasCliente &&
                    cobrancasCliente.map((cobranca) => {
                      return (
                        <div
                          className="linha-cobrancas"
                          key={cobranca.cobranca_id}
                        >
                          <ListaCobrancasPorCliente
                            cobranca={cobranca}
                            cliente={clienteLocal}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

        {mostrarModalCliente && (
          <ModalEditarCliente
            atualizarCliente={atualizarCliente}
            dadosCliente={clienteLocal}
          />
        )}

        {mostrarModalCobranca && (
          <ModalAdicionarCobranca
            atualizarCobrancasCliente={buscarCobrancasCliente}
          />
        )}

        {mostrarModalExcluirCobranca && (
          <ModalExcluirCobranca
            atualizarCobrancasCliente={buscarCobrancasCliente}
          />
        )}
        {mostrarModalDetalheCobranca && <ModalDetalheCobranca />}
        {mostrarModalEdicaoCobranca && (
          <ModalEditarCobranca
            atualizarCobrancasCliente={buscarCobrancasCliente}
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

export default DetalheCliente;
