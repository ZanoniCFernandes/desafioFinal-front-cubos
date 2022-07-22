export default function verificarVencimento(data) {
  const dataVencimento = new Date(data);
  const dataAtual = new Date(new Date().toISOString().split("T")[0]);
  return dataAtual <= dataVencimento;
}
