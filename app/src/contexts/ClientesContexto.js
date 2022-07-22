import { createContext, useContext, useState } from "react";
import api from "../services/api";

const ClientesContexto = createContext({});

export function ClientesProvider({ children }) {
  const [clientes, setClientes] = useState([]);
  const [clientesLocal, setClientesLocal] = useState([]);
  const [clienteModal, setClienteModal] = useState({});
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false);
  const [mostrarModalCobranca, setMostrarModalCobranca] = useState(false);
  const [feedbackInfos, setFeedbackInfos] = useState({
    texto: "",
    tipo: "",
    aberto: false,
  });

  function operarModalCliente() {
    setMostrarModalCliente(!mostrarModalCliente);
  }

  function operarModalCobranca() {
    setMostrarModalCobranca(!mostrarModalCobranca);
  }

  function operarModalFeedback(texto, tipo) {
    if (feedbackInfos.aberto === false) {
      setFeedbackInfos({ texto: texto, tipo: tipo, aberto: true });
    } else {
      setFeedbackInfos({ aberto: false });
    }
  }

  async function buscarClientes(token, estadoFiltro) {
    let urlBase = "/listar-clientes";
    if (estadoFiltro) {
      urlBase = `${urlBase}-${estadoFiltro}`;
    }
    try {
      const { data } = await api.get(urlBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const objetoCliente = data.map((item) => {
        let status = item.Status;
        if (estadoFiltro) {
          if (estadoFiltro === "em-dia") {
            status = "Em dia";
          } else {
            status = "Inadimplente";
          }
        }
        const cliente = {
          id: item.cliente.id,
          nome: item.cliente.nome,
          email: item.cliente.email,
          cpf: item.cliente.cpf,
          telefone: item.cliente.telefone,
          cep: item.cliente.cep,
          logradouro: item.cliente.logradouro,
          complemento: item.cliente.complemento,
          bairro: item.cliente.bairro,
          cidade: item.cliente.cidade,
          estado: item.cliente.estado,
          status,
        };
        return cliente;
      });

      setClientes(objetoCliente);
      setClientesLocal(objetoCliente);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ClientesContexto.Provider
      value={{
        clientes,
        setClientes,
        clientesLocal,
        setClientesLocal,
        clienteModal,
        setClienteModal,
        operarModalFeedback,
        feedbackInfos,
        setFeedbackInfos,
        operarModalCobranca,
        mostrarModalCobranca,
        setMostrarModalCobranca,
        operarModalCliente,
        mostrarModalCliente,
        setMostrarModalCliente,
        buscarClientes,
      }}
    >
      {children}
    </ClientesContexto.Provider>
  );
}

export function useClientes() {
  return useContext(ClientesContexto);
}
