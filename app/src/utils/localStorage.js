function definirLocalItem(key, value) {
  localStorage.setItem(key, value)
}


function pegarLocalItem(key) {
  return localStorage.getItem(key);
}


function removerLocalItem(key) {
  localStorage.removeItem(key)
}


function limparLocalItem() {
  localStorage.clear();
}

export { definirLocalItem, pegarLocalItem, removerLocalItem, limparLocalItem }