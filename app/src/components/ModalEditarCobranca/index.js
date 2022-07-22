import { useState } from "react";
import Fechar from "../../assets/botao-fechar.svg";
import IconeCobrancas from "../../assets/icone-cobrancas.svg";
import api from "../../services/api";
import "./styles.css";
import Selecao from "../../assets/selecao.svg";
import { useClientes } from "../../contexts/ClientesContexto";
import { format, addHours } from "date-fns";
import { useCobrancas } from "../../contexts/CobrancasContexto";
import { useAutenticacao } from "../../contexts/AutenticacaoContexto";

function EditarCobranca({ atualizarCobrancasCliente }) {
  const {
    operarModalEdicaoCobranca,
    cobrancaEdicao,
    setCobrancaEdicao,
    buscarCobrancas,
  } = useCobrancas();
  const { operarModalFeedback } = useClientes();
  const { token } = useAutenticacao();
  // eslint-disable-next-line
  const [aviso, setAviso] = useState("");
  const data = format(
    addHours(new Date(cobrancaEdicao.vencimento), 3),
    "yyyy-MM-dd"
  );
  const [form, setForm] = useState({
    id: cobrancaEdicao.cobranca_id,
    nome: cobrancaEdicao.cliente,
    descricao: cobrancaEdicao.descricao,
    vencimento: data,
    status: cobrancaEdicao.status,
    valor: Number(cobrancaEdicao.valor) / 100,
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


  async function atualizarCobranca(e) {
    e.preventDefault();

    const regExNome = /\w/g;
    // const regExNumber = /\D/gi;

    if (!form.descricao || !regExNome.test(form.descricao)) {
      setAviso("O campo descrição é obrigatório");
      return;
    }

    if (!form.vencimento) {
      setAviso("O campo vencimento é obrigatório");
      return;
    }

    if (!form.valor || form.valor <= 0) {
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
      // valor: Number(form.valor.replace(regExNumber, '')),
      valor: Number(form.valor * 100),
      vencimento: form.vencimento,
    };

    try {
      await api.put(
        `/atualizar-cobranca/${cobrancaEdicao.cobranca_id}`,
        {
          ...objetoRequisicao,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (atualizarCobrancasCliente) {
        atualizarCobrancasCliente();
      } else {
        buscarCobrancas(token);
      }

      setAviso("");
      limparForm();
      setCobrancaEdicao({});
      operarModalEdicaoCobranca();
      setTimeout(() => {
        operarModalFeedback("Cobrança atualizada com sucesso", "sucesso");
      }, 1000);
    } catch (error) {
      setAviso(error.response.data);
    }
  }

  return (
    <div className="container-editar-cobrancas">
      <div className="modal-editar-cobrancas">
        <div className="botao-fechar">
          <img
            onClick={() => operarModalEdicaoCobranca()}
            src={Fechar}
            alt="fechar"
          />
        </div>
        <div className="modal-titulo">
          <img src={IconeCobrancas} alt="icone cobranças" />
          <h1>Edição de Cobrança</h1>
        </div>
        <div className="modal-form">
          <form>
            <label>
              Nome*:
              <input
                required
                disabled
                type="text"
                name="nome"
                value={form.nome}
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
                <input
                  required
                  placeholder="Digite o valor"
                  type="number"
                  min="1"
                  name="valor"
                  // value={String(form.valor / 100).replace('.', ',')}
                  value={form.valor}
                  onChange={(e) => {
                    setForm({ ...form, valor: e.target.value });
                  }}
                />
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
                onClick={() => operarModalEdicaoCobranca()}
                className="modal-botao cancelar"
              >
                Cancelar
              </button>
              <button
                className="modal-botao aplicar"
                onClick={(e) => atualizarCobranca(e)}
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

export default EditarCobranca;
