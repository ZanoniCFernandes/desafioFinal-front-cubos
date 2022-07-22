import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import checkIcon from "../../assets/checkIcon.png";
import { ReactComponent as StepBarActive } from "../../assets/stepBarActive.svg";
import { ReactComponent as StepBarInactive } from "../../assets/stepBarInactive.svg";
import { ReactComponent as StepConector } from "../../assets/stepConector.svg";
import { ReactComponent as StepIconCheck } from "../../assets/stepIconCheck.svg";
import { ReactComponent as StepIconDone } from "../../assets/stepIconDone.svg";
import { ReactComponent as StepIconUndone } from "../../assets/stepIconUndone.svg";
import StyledButton from "../../components/Botao";
import api from "../../services/api";
import "./styles.css";

function Cadastrar() {
  const navigate = useNavigate();
  const regex = /\w/g;
  const [stepAtivo, setStepAtivo] = useState(0);
  const [mostrarSenha, setMostrarSenha] = useState("password");
  const [aviso, setAviso] = useState("");
  const [senhaEstaVerificada, setSenhaEstaVerificada] = useState();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    senhaVerificada: "",
  });
  const steps = [
    {
      label: "Cadastre-se",
      description: `Por favor, escreva seu nome e e-mail`,
    },
    {
      label: "Escolha uma senha",
      description: "Escolha uma senha segura",
    },
    {
      label: "Cadastro realizado com sucesso",
      description: `E-mail e senha cadastrados com sucesso`,
    },
  ];

  useEffect(() => {
    if (form.senha === form.senhaVerificada) {
      setSenhaEstaVerificada(true);
      setAviso("");
    } else {
      setSenhaEstaVerificada(false);
      setAviso("Senhas não confirmam");
    }
  }, [form]);

  useEffect(() => {
    if (stepAtivo === 2) {
      setTimeout(() => {
        navigateLogin();
      }, 2000);
    }
    // eslint-disable-next-line
  }, [stepAtivo]);

  const proximoStep = () => {
    if (!form.nome || !regex.test(form.nome) || !form.email) {
      setAviso("Todos os campos são obrigatórios");
      return;
    }
    setStepAtivo((stepAtivoAnterior) => stepAtivoAnterior + 1);
  };

  const buscarIconeStepEsquerdo = (indice, stepAtual) => {
    if (indice === stepAtual && stepAtual !== steps.length - 1) {
      return StepIconDone;
    } else if (indice < stepAtual || stepAtual === steps.length - 1) {
      return StepIconCheck;
    } else {
      return StepIconUndone;
    }
  };

  const buscarIconeStepDireito = (indice, stepAtual) => {
    if (indice === stepAtual) {
      return StepBarActive;
    } else {
      return StepBarInactive;
    }
  };

  const funcaoMostrarSenha = () => {
    if (mostrarSenha === "password") {
      setMostrarSenha("text");
    } else {
      setMostrarSenha("password");
    }
  };

  const navigateLogin = () => {
    navigate("/");
  };

  async function enviarFormulario(e) {
    e.preventDefault();

    if (!senhaEstaVerificada) {
      setAviso("As senhas não coincidem");
      return;
    }

    if (
      !form.nome ||
      !regex.test(form.nome) ||
      !form.email ||
      !form.senha ||
      !form.senhaVerificada
    ) {
      setAviso("Todos os campos são obrigatórios");
      return;
    }

    try {
      await api.post("/cadastrar", {
        ...form,
        nome: form.nome.trim(),
      });

      proximoStep();
    } catch (error) {
      setAviso(error.response.data);
      setStepAtivo(0);
    }
  }

  return (
    <div className="container-up">
      <div className="sign-up-left">
        <div className="stepper-left">
          <Stepper
            activeStep={stepAtivo}
            orientation="vertical"
            connector={<StepConector />}
          >
            {steps.map((step, indice) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={buscarIconeStepEsquerdo(indice, stepAtivo)}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "var(--verde-normal)",
                      fontSize: "1.8rem",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {step.label}
                  </span>
                  <br />
                  <span
                    style={{
                      color: "var(--cinza-escuro)",
                      fontSize: "1.8rem",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {step.description}
                  </span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>

      <div className="sign-up-right">
        <form onSubmit={enviarFormulario} className="sign-up-form">
          {stepAtivo === 0 && (
            <div className="form-step-1">
              <h2>Adicione seus dados</h2>
              <label>
                Nome*
                <input
                  required
                  type="text"
                  name="nome"
                  placeholder="Digite seu nome"
                  value={form.nome}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                />
              </label>
              <label>
                E-mail*
                <input
                  required
                  type="text"
                  name="email"
                  placeholder="Digite seu e-mail"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value.trim() })
                  }
                />
              </label>
              <span className="aviso">{aviso}</span>
              <StyledButton text="Continuar" onClickFunction={proximoStep} />
              <div className="link-to-sign-in">
                <p>
                  Já possui uma conta? Faça seu{" "}
                  <Link to="/" className="link">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          )}
          {stepAtivo === 1 && (
            <div className="form-step-2">
              <h2>Escolha uma senha</h2>
              <label>
                Senha*
                <div className="input-password">
                  <input
                    required
                    minLength={5}
                    placeholder="Digite sua senha"
                    type={mostrarSenha}
                    name="senha"
                    value={form.senha}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [e.target.name]: e.target.value.trim(),
                      })
                    }
                  />
                  <div className="password-icon" onClick={funcaoMostrarSenha}>
                    {mostrarSenha === "password" ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </div>
                </div>
              </label>
              <label>
                Repita a senha*
                <div className="input-password">
                  <input
                    required
                    minLength={5}
                    placeholder="Repita a senha"
                    type={mostrarSenha}
                    name="senhaVerificada"
                    value={form.senhaVerificada}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [e.target.name]: e.target.value.trim(),
                      })
                    }
                  />
                  <div className="password-icon" onClick={funcaoMostrarSenha}>
                    {mostrarSenha === "password" ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </div>
                </div>
              </label>
              <span className="aviso">{aviso}</span>
              <StyledButton
                type="submit"
                onClickFunction={(e) => {
                  enviarFormulario(e);
                }}
                text="Entrar"
              />
              <div className="link-to-sign-in">
                <p>
                  Já possui uma conta? Faça seu{" "}
                  <Link to="/" className="link">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          )}
        </form>
        {stepAtivo === 2 && (
          <div className="success-sign-up">
            <div className="success-card">
              <img src={checkIcon} alt="check" />
              <h2>Cadastro realizado com sucesso!</h2>
            </div>
            <StyledButton
              text="Ir para Login"
              onClickFunction={navigateLogin}
            />
          </div>
        )}
        <div className="stepper-right">
          <Stepper activeStep={stepAtivo} orientation="horizontal">
            {steps.map((step, indice) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={buscarIconeStepDireito(indice, stepAtivo)}
                ></StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </div>
  );
}

export default Cadastrar;
