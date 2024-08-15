document.querySelector("#search-year").addEventListener("click", consultaPorAno);
document.querySelector("#search-2024-year").addEventListener("click", consultaPeloAnoAtual);

async function consultaPorAno() {
  let year = document.querySelector("#year").value;
  const url = "https://brasilapi.com.br/api/feriados/v1/" + year;

  try {
    let resposta = await fetch(url);

    if (resposta.status === 404) {
      throw new Error("Ano fora do intervalo suportado (404)");
    } else if (resposta.status === 500) {
      throw new Error("Erro inesperado (500)");
    }

    let js = await resposta.json();
    mostraFeriado(js, year);
  } catch (err) {
    const painel = document.querySelector("#mostra");
    painel.innerHTML = `<h1>Problema no acesso aos dados</h1><p>Mensagem: ${err}</p>`;
  }
}

async function consultaPeloAnoAtual() {
  const year = new Date().getFullYear();
  const url = "https://brasilapi.com.br/api/feriados/v1/" + year;

  try {
    let resposta = await fetch(url);
    let js = await resposta.json();
    mostraFeriado(js, year);
  } catch (err) {
    const painel = document.querySelector("#mostra");
    painel.innerHTML = `<h1>Problema no acesso aos dados</h1><p>Mensagem: ${err}</p>`;
  }
}

function mostraFeriado(js, year) {
  const painel = document.querySelector("#mostra");
  painel.innerHTML = `<h1>Feriados nacionais no ano de ${year}</h1>`;
  js.forEach((feriado) => {
    painel.innerHTML += `<p>Nome: ${feriado.name}, Data: ${feriado.date}</p>`;
  });
}