import { createContext, useContext, useState } from "react";
import api from "../services/api";

const CobrancasContexto = createContext({});

export function CobrancasProvider({ children }) {
  const [cobrancas, setCobrancas] = useState([]);
  const [cobrancasLocal, setCobrancasLocal] = useState([]);
  const [cobrancaExcluir, setCobrancaExcluir] = useState({});
  const [mostrarModalExcluirCobranca, setMostrarModalExcluirCobranca] =
    useState(false);
  const [mostrarModalDetalheCobranca, setMostrarModalDetalheCobranca] =
    useState(false);
  const [cobrancaDetalhe, setCobrancaDetalhe] = useState({});
  const [mostrarModalEdicaoCobranca, setMostrarModalEdicaoCobranca] =
    useState(false);
  const [cobrancaEdicao, setCobrancaEdicao] = useState({});
  const [backdrop, setBackdrop] = useState(false);

  function operarModalExcluirCobranca(cobranca) {
    if (cobranca) {
      setCobrancaExcluir(cobranca);
    }
    setMostrarModalExcluirCobranca(!mostrarModalExcluirCobranca);
  }

  function operarModalDetalheCobranca(cobranca) {
    if (cobranca) {
      setCobrancaDetalhe(cobranca);
    }
    setMostrarModalDetalheCobranca(!mostrarModalDetalheCobranca);
  }

  function operarModalEdicaoCobranca(cobranca) {
    if (cobranca) {
      setCobrancaEdicao(cobranca);
    }
    setMostrarModalEdicaoCobranca(!mostrarModalEdicaoCobranca);
  }

  async function buscarCobrancas(token, estadoFiltro) {
    setBackdrop(true);
    let urlBase = "/listar-cobrancas";
    if (estadoFiltro) {
      urlBase = `${urlBase}-${estadoFiltro}`;
    }
    try {
      const { data } = await api.get(urlBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCobrancas(data);
      setCobrancasLocal(data);
      setTimeout(() => {
        setBackdrop(false);
      }, 100);
    } catch (error) {
      console.log(error);
      setBackdrop(false);
    }
  }

  return (
    <CobrancasContexto.Provider
      value={{
        cobrancas,
        setCobrancas,
        cobrancasLocal,
        setCobrancasLocal,
        buscarCobrancas,
        mostrarModalExcluirCobranca,
        setMostrarModalExcluirCobranca,
        operarModalExcluirCobranca,
        cobrancaExcluir,
        setCobrancaExcluir,
        operarModalDetalheCobranca,
        mostrarModalDetalheCobranca,
        setMostrarModalDetalheCobranca,
        cobrancaDetalhe,
        setCobrancaDetalhe,
        operarModalEdicaoCobranca,
        mostrarModalEdicaoCobranca,
        setMostrarModalEdicaoCobranca,
        cobrancaEdicao,
        setCobrancaEdicao,
        backdrop,
        setBackdrop,
      }}
    >
      {children}
    </CobrancasContexto.Provider>
  );
}

export function useCobrancas() {
  return useContext(CobrancasContexto);
}
