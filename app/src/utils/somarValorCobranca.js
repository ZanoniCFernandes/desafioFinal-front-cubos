export default function obterValorTotal(cobrancas) {
  let valorTotal = 0;
  for (let cobranca of cobrancas) {
    valorTotal += cobranca.valor;
  }
  return valorTotal;
}
