import { useState } from "react";
import Fechar from "../../assets/botao-fechar.svg";
import IconeCliente from "../../assets/clientes-inativo.svg";
import "./styles.css";
import api from "../../services/api";
import apiViaCep from "../../services/apiViaCep";

import { useClientes } from "../../contexts/ClientesContexto";
import { useAutenticacao } from "../../contexts/AutenticacaoContexto";

function AdicionarCliente() {
  const { token } = useAutenticacao();
  const { operarModalCliente, buscarClientes, operarModalFeedback } =
    useClientes();
  const [aviso, setAviso] = useState("");
  const avisoEmail = "O e-mail informado já existe.";
  const avisoCpf = "O CPF informado já existe.";
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  function limparForm() {
    setForm({
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      cep: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
    });
  }

  async function cadastrarCliente(e) {
    e.preventDefault();

    const regex = /\w/g;

    if (!form.nome || !regex.test(form.nome)) {
      setAviso("O campo nome é obrigatório");
      return;
    }

    if (!form.email) {
      setAviso("O campo email é obrigatório");
      return;
    }

    if (!form.cpf) {
      setAviso("O campo CPF é obrigatório");
      return;
    }

    if (!form.telefone) {
      setAviso("O campo telefone é obrigatório");
      return;
    }

    try {
      await api.post(
        "/cadastrar-cliente",
        {
          ...form,
          nome: form.nome.trim(),
          bairro: form.bairro.trim(),
          cep: form.cep.trim(),
          cidade: form.cidade.trim(),
          complemento: form.complemento.trim(),
          estado: form.estado.trim(),
          logradouro: form.logradouro.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAviso("");
      limparForm();
      operarModalCliente();
      buscarClientes(token);
      setTimeout(() => {
        operarModalFeedback("Cadastro concluído com sucesso", "sucesso");
      }, 1000);
    } catch (error) {
      setAviso(error.response.data);
    }
  }

  async function buscarCep(cep) {
    let dadosCep = {};
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length < 8) {
      return;
    }

    try {
      await apiViaCep.get(`/${cepLimpo}/json`).then((response) => {
        dadosCep = response.data;
      });
      setForm({
        ...form,
        cep: cepLimpo,
        logradouro: dadosCep.logradouro,
        bairro: dadosCep.bairro,
        cidade: dadosCep.localidade,
        estado: dadosCep.uf,
      });
    } catch (error) {
      return;
    }
  }

  return (
    <div className="container-add-cliente">
      <div className="modal-add-cliente">
        <div className="botao-fechar">
          <img onClick={() => operarModalCliente()} src={Fechar} alt="fechar" />
        </div>
        <div className="modal-titulo">
          <img src={IconeCliente} alt="icone clientes" />
          <h1>Cadastro de Clientes</h1>
        </div>
        <div className="modal-form">
          <form onSubmit={(e) => cadastrarCliente(e)}>
            <label>
              Nome*
              <input
                required
                placeholder="Digite o nome"
                type="text"
                name="nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </label>
            <label>
              E-mail*
              <input
                required
                placeholder="Digite o e-mail"
                type="text"
                name="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value.trim() })
                }
              />
            </label>

            {aviso === avisoEmail && (
              <div className="aviso">
                <span>{aviso}</span>
              </div>
            )}

            <div className="input-dividido">
              <label>
                CPF*
                <input
                  required
                  placeholder="Digite o CPF"
                  type="number"
                  name="cpf"
                  value={form.cpf}
                  onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                />
              </label>
              <label>
                Telefone*
                <input
                  required
                  placeholder="Digite o telefone"
                  type="number"
                  name="telefone"
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                />
              </label>
            </div>

            {aviso === avisoCpf && (
              <div className="aviso">
                <span>{aviso}</span>
              </div>
            )}
            <div className="input-dividido">
              <label>
                CEP
                <input
                  placeholder="Digite o CEP"
                  type="text"
                  name="cep"
                  value={form.cep}
                  onChange={(e) => setForm({ ...form, cep: e.target.value })}
                  onBlur={(e) => buscarCep(e.target.value)}
                  maxLength="9"
                />
              </label>
              <div className="blank"></div>
            </div>

            <label>
              Endereço
              <input
                placeholder="Digite o endereço"
                type="text"
                name="logradouro"
                value={form.logradouro}
                onChange={(e) =>
                  setForm({ ...form, logradouro: e.target.value })
                }
              />
            </label>
            <label>
              Complemento
              <input
                placeholder="Digite o complemento"
                type="text"
                name="complemento"
                value={form.complemento}
                onChange={(e) =>
                  setForm({ ...form, complemento: e.target.value })
                }
              />
            </label>

            <label>
              Bairro
              <input
                placeholder="Digite o bairro"
                type="text"
                name="bairro"
                value={form.bairro}
                onChange={(e) => setForm({ ...form, bairro: e.target.value })}
              />
            </label>
            <div className="input-dividido">
              <label className="input-cidade">
                Cidade
                <input
                  placeholder="Digite a cidade"
                  type="text"
                  name="cidade"
                  value={form.cidade}
                  onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                />
              </label>
              <label className="input-uf">
                UF
                <input
                  placeholder="Digite o UF"
                  type="text"
                  name="estado"
                  value={form.estado}
                  onChange={(e) => setForm({ ...form, estado: e.target.value })}
                  maxLength="2"
                />
              </label>
            </div>
            {aviso !== avisoEmail && aviso !== avisoCpf && (
              <div className="aviso">
                <span>{aviso}</span>
              </div>
            )}

            <div className="modal-botoes">
              <button type="submit" className="modal-botao aplicar">
                Aplicar
              </button>
              <button
                type="button"
                onClick={() => operarModalCliente()}
                className="modal-botao cancelar"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdicionarCliente;
