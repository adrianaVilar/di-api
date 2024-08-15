const urlDog = "https://api.thedogapi.com/v1/images/search?limit=1";
const urlCat = "https://api.thecatapi.com/v1/images/search?limit=1";
const urlComments = "https://jsonplaceholder.typicode.com/posts/1/comments";

document.getElementById("request-all").addEventListener("click", fetchImagesAll);
document.getElementById("request-race").addEventListener("click", fetchImagesRace);


function fetchImagesAll() {
  Promise.all([
    fetch(urlDog).then(response => response.json()),
    fetch(urlCat).then(response => response.json()),
    fetch(urlComments).then(response => response.json())])
  .then(results => {
    const [dogData, catData, comment] = results;
    let randomNum = getRandomInt(5);

    const resultDiv = document.getElementById("mostra2");
    resultDiv.innerHTML = `
      <div class="promisse-container">
        <div>
          <h3>Cachorro</h3>
          <img src="${dogData[0].url}" alt="Dog Image">
        </div> 
        <div> 
          <h3>Gato</h3>
          <img src="${catData[0].url}" alt="Cat Image">
        </div> 
      </div>
      <div> 
        <h3>Comentário</h3>
        <p>${comment[randomNum].email}: "${comment[randomNum].body}"</p>
      </div>
    `;
  })
  .catch(error => {
    console.error('Erro ao buscar as imagens:', error);
  });
}

function fetchImagesRace() {
  Promise.race([
    fetch(urlDog).then(response => response.json()),
    fetch(urlCat).then(response => response.json()),
    fetch(urlComments).then(response => response.json())
  ])
  .then(result => {
    let randomNum = getRandomInt(5);
    const resultDiv = document.getElementById("mostra2");

    if (result[0].url) {
      // Se a resposta foi de dogData ou catData (ambos têm a propriedade url)
      const isDog = result[0].url.includes("dog");
      resultDiv.innerHTML = `
        <div class="promisse-container">
          <div>
            <h3>${isDog ? "Cachorro" : "Gato"}</h3>
            <img src="${result[0].url}" alt="${isDog ? "Dog" : "Cat"} Image">
          </div>
        </div>
      `;
    } else if (result[randomNum].email) {
      // Se a resposta foi de commentData (possui a propriedade email)
      resultDiv.innerHTML = `
        <div> 
          <h3>Comentário</h3>
          <p>${result[randomNum].email}: "${result[0].body}"</p>
        </div>
      `;
    }
  })
  .catch(error => {
    console.error('Erro ao buscar as imagens:', error);
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
