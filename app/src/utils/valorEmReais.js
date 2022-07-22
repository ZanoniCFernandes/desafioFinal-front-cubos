export default function definirValorEmReais(valor) {
  const valorEmReais = (valor / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return valorEmReais;
}
