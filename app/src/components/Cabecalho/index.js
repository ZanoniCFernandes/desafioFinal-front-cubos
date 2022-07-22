import "./styles.css";
import SetaBaixo from "../../assets/seta-baixo.svg";
import BotaoEditar from "../../assets/botao-editar.svg";
import BotaoSair from "../../assets/botao-sair.svg";
import AvatarLetras from "../Avatar";
import { pegarLocalItem, limparLocalItem } from "../../utils/localStorage";
import instanciaAxios from "../../services/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditarUSuario from "../../components/ModalEditarUsuario";
import { useAutenticacao } from "../../contexts/AutenticacaoContexto";

function Cabecalho({ pagina }) {
  const { setToken } = useAutenticacao();
  const navigate = useNavigate();
  const token = pegarLocalItem("token");
  const usuarioNomeLocal = pegarLocalItem("userNome");
  const usuarioId = pegarLocalItem("usuarioId");
  const [cabecalhoPagina, setCabecalhoPagina] = useState("");
  const [mostrarModalCabecalho, setMostrarModalCabecalho] = useState(false);
  // eslint-disable-next-line
  const [aviso, setAviso] = useState("");
  const [mostrarModalEdicaoUsuario, setMostrarModalEdicaoUsuario] =
    useState(false);
  const [usuarioNome, setUsuarioNome] = useState(usuarioNomeLocal);
  const [usuarioEmail, setUsuarioEmail] = useState("");
  const [usuarioCpf, setUsuarioCpf] = useState("");
  const [usuarioTelefone, setUsuarioTelefone] = useState("");
  const [nomeAvatar, setNomeAvatar] = useState(usuarioNomeLocal);

  function realizarLogout() {
    limparLocalItem();
    setToken(null);
    navigate("/");
  }

  function nomearCabecalho(pagina) {
    if (pagina === "home") {
      setCabecalhoPagina("Resumo das Cobranças");
    } else if (pagina === "clientes") {
      setCabecalhoPagina("Clientes");
    } else if (pagina === "cobrancas") {
      setCabecalhoPagina("Cobranças");
    }
  }

  async function pegarInformacoesUsuario() {
    try {
      const { data } = await instanciaAxios.get(`dados-usuario/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsuarioNome(data.nome);
      setUsuarioEmail(data.email);
      setUsuarioCpf(data.cpf);
      setUsuarioTelefone(data.telefone);
    } catch (error) {
      setAviso(error.response.data);
    }
  }

  useEffect(() => {
    nomearCabecalho(pagina);
    pegarInformacoesUsuario();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container-cabecalho">
        <div className="cabecalho-esquerda">
          {pagina !== "detalhe-cliente" ? (
            <h1
              className={
                pagina === "clientes" || pagina === "cobrancas"
                  ? "detalhe-cliente"
                  : ""
              }
            >
              {cabecalhoPagina}
            </h1>
          ) : (
            <div className="detalhe-cliente">
              <span>Clientes</span>
              <span>&gt;</span>
              <span>Detalhes do Cliente</span>
            </div>
          )}
        </div>
        <div className="cabecalho-direita">
          <AvatarLetras nomeAvatar={nomeAvatar} />
          <p>{usuarioNomeLocal}</p>
          <img
            className="cabecalho-seta-modal"
            src={SetaBaixo}
            alt="abrir menu"
            onClick={() => setMostrarModalCabecalho(!mostrarModalCabecalho)}
          />
          {mostrarModalCabecalho && (
            <div className="cabecalho-modal">
              <img
                src={BotaoEditar}
                alt="editar-usuario"
                onClick={() =>
                  setMostrarModalEdicaoUsuario(!mostrarModalEdicaoUsuario)
                }
              />
              <img
                onClick={() => realizarLogout()}
                src={BotaoSair}
                alt="sair"
              />
            </div>
          )}
        </div>
      </div>
      <div className="cabecalho-linha"></div>
      {mostrarModalEdicaoUsuario && (
        <EditarUSuario
          setMostrarModalEdicaoUsuario={setMostrarModalEdicaoUsuario}
          mostrarModalEdicaoUsuario={mostrarModalEdicaoUsuario}
          usuarioNome={usuarioNome}
          setUsuarioNome={setUsuarioNome}
          usuarioEmail={usuarioEmail}
          setUsuarioEmail={setUsuarioEmail}
          usuarioCpf={usuarioCpf}
          setUsuarioCpf={setUsuarioCpf}
          usuarioTelefone={usuarioTelefone}
          setUsuarioTelefone={setUsuarioTelefone}
          setNomeAvatar={setNomeAvatar}
          mostrarModalCabecalho={mostrarModalCabecalho}
          setMostrarModalCabecalho={setMostrarModalCabecalho}
        />
      )}
    </>
  );
}

export default Cabecalho;
