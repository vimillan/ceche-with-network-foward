const url = "https://pokeapi.co/api/v2/pokemon/";
var listPage = [];
var dataList = [];

function getList(urlData) {
  var itemList = document.querySelector("#itemList");
  itemList.innerHTML = "";

  if (urlData == "" || urlData == null) {
    urlData = url;
  }
  
  fetch(urlData)
    .then((response) => response.json())
    .then((data) => {
      dataList = data.results;
      listPage = data;
      for (let data of dataList) {
        fetch(data.url)
          .then((response) => response.json())
          .then((data) => {
            const img = data.sprites.other["official-artwork"].front_default;

            var habilidades = `<ul class="list-group list-group-flush">`;
            for (let hab of data.abilities) {
              habilidades += `<li class="list-group-item">${hab.ability.name}</li>`;
            }
            habilidades += `</ul>`;

            itemList.innerHTML += `
            <div class="col-lg-4">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-lg-5">
                            <img src="${img}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-lg-7">
                            <div class="card-body">
                                <h5 class="card-title">${data.name}</h5>
                                <span class="badge text-bg-info">Habilidades: ${data.abilities.length}</span>
                                <div>
                                  ${habilidades}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
          });
      }
    });
}

function getPaginationNext() {
  if (listPage.next != null) {
    getList(listPage.next);
  }
}

function getPaginationPrev() {
  if (listPage.previous != null) {
    getList(listPage.previous);
  }
}