import './styles.css';
import HomeAtivo from '../../assets/home-ativo.svg';
import HomeInativo from '../../assets/home-inativo.svg';
import ClientesAtivo from '../../assets/clientes-ativo.svg';
import ClientesInativo from '../../assets/clientes-inativo.svg';
import CobrancasAtivo from '../../assets/cobrancas-ativo.svg';
import CobrancasInativo from '../../assets/cobrancas-inativo.svg';
import { useNavigate } from 'react-router-dom';


function Barra({ pagina }) {
  const navigate = useNavigate();

  return (
    <div className="container-bar">
      <div
        className={`home icone ${pagina === 'home' && 'ativo'}`}
        onClick={() => navigate('/home')}
      >
        {pagina === 'home' ? <img src={HomeAtivo} alt="home-icone" /> : <img src={HomeInativo} alt="home-icone" />}
        <h4 className={`${pagina === 'home' && 'rosa'}`}>Home</h4>
      </div>
      <div
        className={`clientes icone ${pagina === 'clientes' && 'ativo'}`}
        onClick={() => navigate('/clientes')}
      >
        {pagina === 'clientes' ? <img src={ClientesAtivo} alt="clientes-icone" /> : <img src={ClientesInativo} alt="clientes-icone" />}
        <h4 className={`${pagina === 'clientes' && 'rosa'}`}>Clientes</h4>
      </div>
      <div
        className={`cobrancas icone ${pagina === 'cobrancas' && 'ativo'}`}
        onClick={() => navigate('/cobrancas')}
      >
        {pagina === 'cobrancas' ? <img src={CobrancasAtivo} alt="cobrancas-icone" /> : <img src={CobrancasInativo} alt="cobrancas-icone" />}
        <h4 className={`${pagina === 'cobrancas' && 'rosa'}`}>Cobranças</h4>
      </div>
    </div>
  );
}

export default Barra;
