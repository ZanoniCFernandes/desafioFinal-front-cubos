import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconeClienteAdimplente from "../../assets/icone-cliente-adimplente.svg";
import { useClientes } from "../../contexts/ClientesContexto";
import formatarCPF from "../../utils/formatarCpf";
import "./styles.css";

function CardClientesAdimplentes() {
  const { clientesLocal } = useClientes();
  const [clientesAdimplentes, setClientesAdimplentes] = useState([]);
  const [clientesAdimplentesLocal, setClientesAdimplentesLocal] = useState([]);

  function separarClientes() {
    const resultadoAdimplentes = clientesLocal.filter(
      (cliente) => cliente.status === "Em dia"
    );
    setClientesAdimplentes(resultadoAdimplentes);
    setClientesAdimplentesLocal(resultadoAdimplentes.slice(0, 3));
  }

  useEffect(() => {
    separarClientes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card card-clientes adimplentes">
      <div className="card-superior">
        <div className="card-superior-esquerda">
          <img src={IconeClienteAdimplente} alt="icone-cliente-adimplente" />
          <h3>Clientes em dia</h3>
        </div>
        <div className="contador pago">
          <h4>{clientesAdimplentes.length}</h4>
        </div>
      </div>
      <div className="card-medio">
        <h4>Cliente</h4>
        <h4>ID do clie.</h4>
        <h4>CPF</h4>
      </div>
      <div className="card-inferior">
        {clientesAdimplentesLocal.map((cliente) => (
          <div key={cliente.id} className="entrada">
            <span>{cliente.nome}</span>
            <span>{cliente.id}</span>
            <span>{formatarCPF(cliente.cpf)}</span>
          </div>
        ))}
      </div>
      <div className="listar">
        <Link to="/clientes" state={"em-dia"} className="ver-todos">
          Ver todos
        </Link>
      </div>
    </div>
  );
}

export default CardClientesAdimplentes;
