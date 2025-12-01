let allGameData = [];
const container = document.querySelector(".container");

fetch("./frontEndData.json")
 .then(function (response) {
  return response.json();
 })
 .then(function (data) {
  allGameData = data;
  populateDropdowns(data);
  appendData(data);
 })
 .catch(function (err) {
  console.log("error: " + err);
 });

function appendData(data) {
 let result = "";
 if (data.length === 0) {
  result = '<p class="no-results">No games found matching your criteria.</p>';
 } else {
  data.forEach(({game_name, game_genre, game_devs, game_series, release_date} = rows) => {
   result += `
        <div class="card">
                <h1 class="card-name">${game_name}</h1>
                <div class="cardImage"><img src="icons/${game_name}.png" width="192" height="192"/></div>
                <div class="cardText">
                <p class="card-about">${game_devs} <br/>
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
 const uniqueDevs = [...new Set(data.map((item) => item.game_devs))].sort();
 const uniqueSeries = [...new Set(data.map((item) => item.game_series))].sort();
 const uniqueGenres = [...new Set(data.map((item) => item.game_genre))].sort();
 const uniqueYears = [...new Set(data.map((item) => item.release_date))].sort((a, b) => b - a);

 const filterDevs = document.getElementById("filter-devs");
 uniqueDevs.forEach((dev) => {
  const option = document.createElement("option");
  option.value = dev;
  option.textContent = dev;
  filterDevs.appendChild(option);
 });

 const filterSeries = document.getElementById("filter-series");
 uniqueSeries.forEach((series) => {
  const option = document.createElement("option");
  option.value = series;
  option.textContent = series;
  filterSeries.appendChild(option);
 });

 const filterGenre = document.getElementById("filter-genre");
 uniqueGenres.forEach((genre) => {
  const option = document.createElement("option");
  option.value = genre;
  option.textContent = genre;
  filterGenre.appendChild(option);
 });

 const filterYear = document.getElementById("filter-year");
 uniqueYears.forEach((year) => {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  filterYear.appendChild(option);
 });

 document.getElementById("filter-devs").addEventListener("change", applyFilters);
 document.getElementById("filter-series").addEventListener("change", applyFilters);
 document.getElementById("filter-genre").addEventListener("change", applyFilters);
 document.getElementById("filter-year").addEventListener("change", applyFilters);
 document.getElementById("search-game").addEventListener("input", applyFilters); // 'input' reacts immediately
}

function applyFilters() {
 const selectedDev = document.getElementById("filter-devs").value;
 const selectedSeries = document.getElementById("filter-series").value;
 const selectedGenre = document.getElementById("filter-genre").value;
 const selectedYear = document.getElementById("filter-year").value;
 const searchText = document.getElementById("search-game").value.toLowerCase();

 let filteredData = allGameData;

 if (searchText) {
  filteredData = filteredData.filter((game) => game.game_name.toLowerCase().includes(searchText));
 }

 if (selectedDev) {
  filteredData = filteredData.filter((game) => game.game_devs === selectedDev);
 }

 if (selectedSeries) {
  filteredData = filteredData.filter((game) => game.game_series === selectedSeries);
 }

 if (selectedGenre) {
  filteredData = filteredData.filter((game) => game.game_genre === selectedGenre);
 }

 if (selectedYear) {
  filteredData = filteredData.filter((game) => game.release_date === selectedYear);
 }

 appendData(filteredData);
}

function openPage(evt, Page) {
 var i, tabcontent, tablinks;
 tabcontent = document.getElementsByClassName("tabcontent");
 for (i = 0; i < tabcontent.length; i++) {
  tabcontent[i].style.display = "none";
 }
 tablinks = document.getElementsByClassName("tablinks");
 for (i = 0; i < tablinks.length; i++) {
  tablinks[i].className = tablinks[i].className.replace(" active", "");
 }
 document.getElementById(Page).style.display = "block";
 evt.currentTarget.className += " active";
}
