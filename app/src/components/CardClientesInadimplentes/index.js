import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconeClienteInadimplente from "../../assets/icone-cliente-inadimplente.svg";
import { useClientes } from "../../contexts/ClientesContexto";
import formatarCpf from "../../utils/formatarCpf";
import "./styles.css";

function CardClientesInadimplentes() {
  const { clientesLocal } = useClientes();
  const [clientesInadimplentes, setClientesInadimplentes] = useState([]);
  const [clientesInadimplentesLocal, setClientesInadimplentesLocal] = useState(
    []
  );

  function separarClientes() {
    const resultadoInadimplentes = clientesLocal.filter(
      (cliente) => cliente.status === "Inadimplente"
    );
    setClientesInadimplentes(resultadoInadimplentes);
    setClientesInadimplentesLocal(resultadoInadimplentes.slice(0, 3));
  }

  useEffect(() => {
    separarClientes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card card-clientes inadimplentes">
      <div className="card-superior">
        <div className="card-superior-esquerda">
          <img
            src={IconeClienteInadimplente}
            alt="icone-cliente-inadimplente"
          />
          <h3 className="sem-bold">Clientes Inadimplentes</h3>
        </div>
        <div className="contador vencido">
          <h4>{clientesInadimplentes.length}</h4>
        </div>
      </div>
      <div className="card-medio">
        <h4>Cliente</h4>
        <h4>ID do clie.</h4>
        <h4>CPF</h4>
      </div>
      <div className="card-inferior">
        {clientesInadimplentesLocal.map((cliente) => (
          <div key={cliente.id} className="entrada">
            <span>{cliente.nome}</span>
            <span>{cliente.id}</span>
            <span>{formatarCpf(cliente.cpf)}</span>
          </div>
        ))}
      </div>
      <div className="listar">
        <Link to="/clientes" state={"inadimplente"} className="ver-todos">
          Ver todos
        </Link>
      </div>
    </div>
  );
}

export default CardClientesInadimplentes;
