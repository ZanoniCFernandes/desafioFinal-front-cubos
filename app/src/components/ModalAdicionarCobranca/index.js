import { useState } from "react";
import Fechar from "../../assets/botao-fechar.svg";
import IconeCobrancas from "../../assets/icone-cobrancas.svg";
import api from "../../services/api";
import "./styles.css";
import Selecao from "../../assets/selecao.svg";
import { useClientes } from "../../contexts/ClientesContexto";
import { useAutenticacao } from "../../contexts/AutenticacaoContexto";
import NumberFormat from 'react-number-format';

function AdicionarCobranca({ atualizarCobrancasCliente }) {
  const {
    operarModalCobranca,
    operarModalFeedback,
    clienteModal,
    buscarClientes,
  } = useClientes();
  const { token } = useAutenticacao();
  const [aviso, setAviso] = useState("");
  const [form, setForm] = useState({
    id: clienteModal.id,
    nome: clienteModal.nome,
    descricao: "",
    vencimento: "",
    status: "pago",
    valor: "",
  });

  function limparForm() {
    setForm({
      id: "",
      nome: "",
      descricao: "",
      vencimento: "",
      status: "",
      valor: "",
    });
  }

  async function cadastrarCobranca(e) {
    e.preventDefault();

    const regExNome = /\w/g;
    const regExNumber = /\D/gi;

    if (!form.nome || !regExNome.test(form.nome)) {
      setAviso("O campo nome é obrigatório");
      return;
    }

    if (!form.descricao || !regExNome.test(form.descricao)) {
      setAviso("O campo descrição é obrigatório");
      return;
    }

    if (!form.vencimento) {
      setAviso("O campo vencimento é obrigatório");
      return;
    }

    if (!form.valor || Number(form.valor.replace(regExNumber, '')) <= 0) {
      setAviso("O campo valor não pode ser igual ou menor que 0");
      return;
    }

    if (!form.status) {
      setAviso("O campo status é obrigatório");
      return;
    }


    const objetoRequisicao = {
      id: Number(form.id),
      descricao: form.descricao.trim(),
      status: form.status,
      valor: Number(form.valor.replace(regExNumber, '')),
      vencimento: form.vencimento,
    };

    try {
      await api.post(
        "/cadastrar-cobranca",
        {
          ...objetoRequisicao,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAviso("");
      limparForm();
      operarModalCobranca();
      buscarClientes(token);

      if (atualizarCobrancasCliente) {
        atualizarCobrancasCliente();
      } else {
        buscarClientes(token);
      }
      setTimeout(() => {
        operarModalFeedback("Cobrança cadastrada com sucesso", "sucesso");
      }, 1000);
    } catch (error) {
      setAviso(error.response.data);
    }
  }

  return (
    <div className="container-adicionar-cobrancas">
      <div className="modal-adicionar-cobrancas">
        <div className="botao-fechar">
          <img
            onClick={() => operarModalCobranca()}
            src={Fechar}
            alt="fechar"
          />
        </div>
        <div className="modal-titulo">
          <img src={IconeCobrancas} alt="icone cobranças" />
          <h1>Cadastro de Cobrança</h1>
        </div>
        <div className="modal-form">
          <form>
            <label>
              Nome*:
              <input
                required
                disabled
                placeholder="Digite o nome"
                type="text"
                name="nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </label>
            <div className="descricao">
              <label>
                Descrição*:
                <textarea
                  required
                  placeholder="Digite a descrição"
                  type="text"
                  name="descricao"
                  value={form.descricao}
                  onChange={(e) =>
                    setForm({ ...form, descricao: e.target.value })
                  }
                  wrap="soft"
                />
              </label>
            </div>
            <div className="input-dividido">
              <label>
                Vencimento*:
                <input
                  required
                  placeholder="Data de vencimento"
                  type="date"
                  name="vencimento"
                  value={form.vencimento}
                  onChange={(e) =>
                    setForm({ ...form, vencimento: e.target.value })
                  }
                />
              </label>
              <label>
                Valor*(R$):
                <NumberFormat
                  value={form.valor}
                  fixedDecimalScale='true'
                  decimalScale={2}
                  prefix="R$"
                  thousandsGroupStyle='thousand'
                  decimalSeparator=","
                  thousandSeparator='.'
                  displayType="input"
                  onChange={(e) => setForm({ ...form, valor: e.target.value })}
                >
                  {/* <input
                    required
                    placeholder="Digite o valor"
                    type="number"
                    min="1"
                    name="valor"
                    value={form.valor}
                    onChange={(e) => {
                      validarValor(e.target.value);
                    }}
                  /> */}
                </NumberFormat>
              </label>
            </div>
            <div className="seletor-status">
              <span>Status*:</span>
              <button
                type="button"
                className="status"
                onClick={() => setForm({ ...form, status: "pago" })}
              >
                {form.status === "pago" ? (
                  <div className="selecionado">
                    <img src={Selecao} alt="verificado" />
                  </div>
                ) : (
                  <div className="nao-selecionado"></div>
                )}
                Cobrança Paga
              </button>
              <button
                type="button"
                className="status"
                onClick={() => setForm({ ...form, status: "pendente" })}
              >
                {form.status === "pendente" ? (
                  <div className="selecionado">
                    <img src={Selecao} alt="verificado" />
                  </div>
                ) : (
                  <div className="nao-selecionado"></div>
                )}
                Cobrança Pendente
              </button>
            </div>
            {aviso && (
              <div className="aviso">
                <span>{aviso}</span>
              </div>
            )}
            <div className="modal-botoes">
              <button
                type="button"
                onClick={() => operarModalCobranca()}
                className="modal-botao cancelar"
              >
                Cancelar
              </button>
              <button
                className="modal-botao aplicar"
                onClick={(e) => cadastrarCobranca(e)}
              >
                Aplicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdicionarCobranca;
