import "./styles.css";
import Fechar from "../../assets/botao-fechar.svg";
import { definirLocalItem } from "../../utils/localStorage";
import instanciaAxios from "../../services/api";
import { useEffect, useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import checkIcon from "../../assets/checkIcon.png";
// import validarCpf from "../../utils/validarCpf";
import { useAutenticacao } from "../../contexts/AutenticacaoContexto";

function EditarUsuario({
  setMostrarModalEdicaoUsuario,
  mostrarModalEdicaoUsuario,
  usuarioNome,
  setUsuarioNome,
  usuarioEmail,
  setUsuarioEmail,
  usuarioCpf,
  setUsuarioCpf,
  usuarioTelefone,
  setUsuarioTelefone,
  setNomeAvatar,
  mostrarModalCabecalho,
  setMostrarModalCabecalho,
}) {
  const { token } = useAutenticacao();
  const [mostrarSenha, setMostrarSenha] = useState("password");
  const [senhaEstaVerificada, setSenhaEstaVerificada] = useState();
  const [aviso, setAviso] = useState("");
  const [sucessoEditar, setSucessoEditar] = useState(false);
  const [usuarioSenha, setUsuarioSenha] = useState({
    senha: "",
    senhaVerificada: "",
  });

  useEffect(() => {
    if (usuarioSenha.senha === usuarioSenha.senhaVerificada) {
      setSenhaEstaVerificada(true);
      setAviso("");
    } else {
      setSenhaEstaVerificada(false);
      setAviso("Senhas não confirmam");
    }

    // if (validarCpf(usuarioCpf) === false) {
    //   setAviso("CPF inválido");
    // }
    // eslint-disable-next-line
  }, [usuarioSenha]);

  const funcaoMostrarSenha = () => {
    if (mostrarSenha === "password") {
      setMostrarSenha("text");
    } else {
      setMostrarSenha("password");
    }
  };

  async function enviarEdicaoUsuario(e) {
    e.preventDefault();
    const regex = /\w/g;

    if (!usuarioNome || !regex.test(usuarioNome)) {
      setAviso("Nome obrigatório");
      return;
    } else if (!usuarioEmail) {
      setAviso("E-mail obrigatório");
      return;
    } else if (!senhaEstaVerificada) {
      setAviso("As senhas não coincidem");
      return;
    }

    const usuarioModificado = {
      nome: usuarioNome.trim(),
      email: usuarioEmail.trim(),
      cpf: usuarioCpf,
      telefone: usuarioTelefone,
      senha: usuarioSenha.senha,
    };

    try {
      await instanciaAxios.put(
        "/atualizar-usuario",
        {
          ...usuarioModificado,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSucessoEditar(true);
      setNomeAvatar(usuarioNome);
      definirLocalItem("userNome", usuarioNome);
      setMostrarModalCabecalho(!mostrarModalCabecalho);

      setTimeout(() => {
        setMostrarModalEdicaoUsuario(!mostrarModalEdicaoUsuario);
      }, 1000);
    } catch (error) {
      setAviso(error.response.data);
    }
  }

  return (
    <div className="container-editar-usuario">
      {!sucessoEditar && (
        <div className="modal-editar-usuario">
          <div className="botao-fechar">
            <img
              onClick={() => {
                setMostrarModalEdicaoUsuario(!mostrarModalEdicaoUsuario);
                setMostrarModalCabecalho(!mostrarModalCabecalho);
              }
              }
              src={Fechar}
              alt="fechar"
            />
          </div>
          <div className="modal-titulo">
            <h1>Edite seu cadastro</h1>
          </div>
          <div className="modal-form">
            <form>
              <label>
                Nome*
                <input
                  required
                  type="text"
                  name="nome"
                  value={usuarioNome}
                  placeholder="Digite seu nome"
                  onChange={(e) => setUsuarioNome(e.target.value)}
                />
              </label>
              <label>
                E-mail*
                <input
                  required
                  type="text"
                  name="email"
                  value={usuarioEmail}
                  placeholder="Digite seu e-mail"
                  onChange={(e) => setUsuarioEmail(e.target.value.trim())}
                />
              </label>
              <div className="input-dividido">
                <label>
                  CPF
                  <input
                    type="number"
                    name="cpf"
                    value={usuarioCpf}
                    placeholder="Digite seu CPF"
                    onChange={(e) => setUsuarioCpf(e.target.value)}
                  />
                </label>
                <label>
                  Telefone
                  <input
                    type="number"
                    name="telefone"
                    value={usuarioTelefone}
                    placeholder="Digite seu telefone"
                    onChange={(e) => setUsuarioTelefone(e.target.value)}
                  />
                </label>
              </div>
              <label>
                Nova Senha
                <div className="input-senha">
                  <input
                    type={mostrarSenha}
                    name="senha"
                    placeholder="Insira nova senha"
                    value={usuarioSenha.senha}
                    onChange={(e) =>
                      setUsuarioSenha({
                        ...usuarioSenha,
                        [e.target.name]: e.target.value.trim(),
                      })
                    }
                  />
                  <div className="icone-senha" onClick={funcaoMostrarSenha}>
                    {mostrarSenha === "password" ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </div>
                </div>
              </label>
              <label>
                Confirmar Senha
                <div className="input-senha">
                  <input
                    name="senhaVerificada"
                    type={mostrarSenha}
                    placeholder="Confirmar nova senha"
                    value={usuarioSenha.senhaVerificada}
                    onChange={(e) =>
                      setUsuarioSenha({
                        ...usuarioSenha,
                        [e.target.name]: e.target.value.trim(),
                      })
                    }
                  />
                  <div className="icone-senha" onClick={funcaoMostrarSenha}>
                    {mostrarSenha === "password" ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </div>
                </div>
              </label>
              <span className="aviso">{aviso}</span>
              <div className="modal-botoes">
                <button
                  type="button"
                  onClick={() => {
                    setMostrarModalEdicaoUsuario(!mostrarModalEdicaoUsuario);
                    setMostrarModalCabecalho(!mostrarModalCabecalho);
                  }}
                  className="modal-botao cancelar"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="modal-botao aplicar"
                  onClick={(e) => enviarEdicaoUsuario(e)}
                >
                  Aplicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {sucessoEditar && (
        <div className="mensagem-sucesso">
          <img src={checkIcon} alt="check" />
          <h2>Cadastro realizado com sucesso!</h2>
        </div>
      )}
    </div>
  );
}

export default EditarUsuario;
