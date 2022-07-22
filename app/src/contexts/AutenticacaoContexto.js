import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instanciaAxios from '../services/api';
import { definirLocalItem, pegarLocalItem } from '../utils/localStorage';

const AutenticacaoContexto = createContext({})

export function AutenticacaoProvider({ children }) {
  const [token, setToken] = useState(pegarLocalItem("token"));
  const [usuario, setUsuario] = useState();
  const navigate = useNavigate();


  async function login({ email, senha }) {

    if (!email || !senha) {
      return new Error("Todos os campos são obrigatórios");
    }

    const response = await instanciaAxios.post("/entrar", {
      email,
      senha,
    });

    const { usuario, token } = response.data;

    setToken(token);
    setUsuario({ id: usuario.id, nome: usuario.nome })

    definirLocalItem("token", token);
    definirLocalItem("usuarioId", usuario.id);
    definirLocalItem("userNome", usuario.nome);
    navigate("/home");
  }

  return <AutenticacaoContexto.Provider value={{
    token,
    setToken,
    usuario,
    setUsuario,
    login,
  }}>
    {children}
  </AutenticacaoContexto.Provider>


}

export function useAutenticacao() {
  return useContext(AutenticacaoContexto)
}
