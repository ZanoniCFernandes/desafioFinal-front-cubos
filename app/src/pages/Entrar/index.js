import "./styles.css";
import { useState, useEffect } from "react";
import StyledButton from "../../components/Botao";
import { useAutenticacao } from "../../contexts/AutenticacaoContexto";
import { Link, useNavigate } from "react-router-dom";

function Entrar() {
  const navigate = useNavigate();
  const { login, token } = useAutenticacao();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/home")
    }
    // eslint-disable-next-line
  }, [])

  async function enviarFormulario(e) {
    e.preventDefault();

    try {
      if (!email || !senha) {
        setAviso("Todos os campos são obrigatórios");
        return;
      }

      await login({ email, senha });
    } catch (error) {
      setAviso(error.response.data);
    }
  }

  return (
    <div className="container-entrar">
      <div className="esquerda-entrar">
        <h2>Gerencie todos os pagamentos da sua empresa em um só lugar.</h2>
      </div>

      <div className="direita-entrar">
        <form onSubmit={(e) => enviarFormulario(e)}>
          <h1>Faça seu login!</h1>
          <div className="container-inputs">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              placeholder="Digite seu e-mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <div className="linha">
              <label htmlFor="password">Senha</label>
              <a href="/">Esqueceu a senha?</a>
            </div>
            <input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value.trim())}
            />
          </div>
          <span className="aviso">{aviso}</span>
          <StyledButton type="submit" text="Entrar" />
          <p className="rota-cadastro">
            Ainda não possui uma conta?
            <Link className="rota-cadastro-link" to="/cadastrar">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Entrar;
