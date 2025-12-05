const container = document.querySelector(".container");

async function init() {
 const data = await fetch("/api/ea_games").then((res) => res.json());

 populateDropdowns(data);
 appendData(data);
}

init();

function appendData(data) {
 let result = "";

 if (data.length === 0) {
  result = '<p class="no-results">No games found matching your criteria.</p>';
 } else {
  data.forEach(({game_name, game_genre, game_devs, game_series, release_date}) => {
   result += `
        <div class="card">
          <h1 class="card-name">${game_name}</h1>
          <div class="cardImage">
            <img src="icons/${game_name}.png" width="192" height="192"/>
          </div>
          <div class="cardText">
            <p class="card-about">
              ${game_devs} <br/>
              ${game_series} <br/>
              ${game_genre} <br/>
              ${release_date}
            </p>
          </div>
        </div>
        `;
  });
 }

 container.innerHTML = result;
}

function populateDropdowns(data) {
 const unique = (arr) => [...new Set(arr)].sort();

 fillDropdown("filter-devs", unique(data.map((i) => i.game_devs)));
 fillDropdown("filter-series", unique(data.map((i) => i.game_series)));
 fillDropdown("filter-genre", unique(data.map((i) => i.game_genre)));
 fillDropdown("filter-year", unique(data.map((i) => i.release_date)));

 document.getElementById("filter-devs").addEventListener("change", fetchFiltered);
 document.getElementById("filter-series").addEventListener("change", fetchFiltered);
 document.getElementById("filter-genre").addEventListener("change", fetchFiltered);
 document.getElementById("filter-year").addEventListener("change", fetchFiltered);
 document.getElementById("search-game").addEventListener("input", fetchFiltered);
}

function fillDropdown(id, arr) {
 const select = document.getElementById(id);

 arr.forEach((value) => {
  const opt = document.createElement("option");
  opt.value = value;
  opt.textContent = value;
  select.appendChild(opt);
 });
}

async function fetchFiltered() {
 const params = new URLSearchParams({
  search: document.getElementById("search-game").value,
  dev: document.getElementById("filter-devs").value,
  series: document.getElementById("filter-series").value,
  genre: document.getElementById("filter-genre").value,
  year: document.getElementById("filter-year").value,
 });

 const data = await fetch(`/api/filter?${params}`).then((res) => res.json());
 appendData(data);
}

function openPage(evt, Page) {
 var tabcontent = document.getElementsByClassName("tabcontent");
 var tablinks = document.getElementsByClassName("tablinks");

 for (let i = 0; i < tabcontent.length; i++) {
  tabcontent[i].style.display = "none";
 }

 for (let i = 0; i < tablinks.length; i++) {
  tablinks[i].className = tablinks[i].className.replace(" active", "");
 }

 document.getElementById(Page).style.display = "block";
 evt.currentTarget.className += " active";
}
