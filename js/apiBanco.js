document.querySelector("#search").addEventListener("click", consultaApis);
document.querySelector("#search-all").addEventListener("click", consultaTodos);

async function consultaApis() {
  let code = document.querySelector("#code").value;
  const url = "https://brasilapi.com.br/api/banks/v1/" + code;

  try {
    let resposta = await fetch(url);
    let js = await resposta.json();
    mostraBancoPorCodigo(js);

    if (resposta.status === 404) {
      throw new Error("Banco não localizado (404)");
    }
  } catch (err) {
    const painel = document.querySelector("#mostra");
    painel.innerHTML = `<h1>Problema no acesso aos dados</h1><p>Mensagem: ${err}</p>`;
  }
}

async function consultaTodos() {
  const url = "https://brasilapi.com.br/api/banks/v1";

  try {
    let resposta = await fetch(url);
    let js = await resposta.json();
    mostraTodosOsBancos(js);
  } catch (err) {
    const painel = document.querySelector("#mostra");
    painel.innerHTML = `<h1>Problema no acesso aos dados</h1><p>Mensagem: ${err}</p>`;
  }
}

function mostraBancoPorCodigo(js) {
  const painel = document.querySelector("#mostra");
  painel.innerHTML = `<h1>Nome e ISPB:</h1><p>Nome: ${js.name}<br>ISPB: ${js.ispb}</p>`;
}

function mostraTodosOsBancos(js) {
  const painel = document.querySelector("#mostra");
  painel.innerHTML = "<h1>Nome e ISPB:</h1>";
  js.forEach((banco) => {
    painel.innerHTML += `<p>Nome: ${banco.name}, Código: ${banco.code}</p>`;
  });
}