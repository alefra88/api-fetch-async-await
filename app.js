//       C O D I G O      A S I N C R O N O

function renderCharacters(characters) {
  const $fragment = document.createDocumentFragment();
  characters.forEach((el) => {
    const article = document.createRange().createContextualFragment(`
      <article>
      <div class="container">
        <div>
          <img src="${el.image}" alt="personaje">
        </div>
        <h2>${el.name}</h2>
        <h3>status: ${el.status}</h3>
        <h3>Origin: ${el.origin.name}</h3>
        <h3>Location: ${el.location.name}</h3>
        <h3>Species: ${el.species}</h3>
        <h3>Gender: ${el.gender}</h3>
      </div>
      </article>
      <br>
      <hr>
    `);
    $fragment.append(article);
  });
  const $fetch = document.getElementById("fetch");
  $fetch.append($fragment);
}
(async () => {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const { results: characters } = await res.json();
    renderCharacters(characters);
  } catch (err) {
    console.log(err);
  }
})();

//estilo jon mircha
(() => {
  const $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();
  async function getData() {
    try {
      let res = await fetch("https://rickandmortyapi.com/api/location"),
        { results: characters } = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      characters.forEach((el) => {
        const article = document.createRange().createContextualFragment(`
      <article>
      <div class="container">
        <h2> location name: ${el.name}</h2>
        <h3>type: ${el.type}</h3>
        <h3>dimension: ${el.dimension}</h3>
      </div>
      </article>
      <br>
      <hr>
    `);
        $fragment.append(article);
      });
      $fetchAsync.append($fragment);
    } catch (err) {
      console.log(err);
      let message = err.statusText || "Error desconocido";
      $fetchAsync.innerHTML = `Error ${err.status}: ${message}`;
    } finally {
    }
  }
  getData();
})();
