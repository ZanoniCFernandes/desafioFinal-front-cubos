import "./styles.css";

import ErroBusca from "../../assets/erro-busca.svg";

function ErroSemResultadoBusca() {
  return (
    <div className="erro-busca">
      <img src={ErroBusca} alt="sem resultados" />
      <h1>Nenhum resultado foi encontrado!</h1>
      <h2>Verifique se escrita está correta</h2>
    </div>
  );
}

export default ErroSemResultadoBusca;
