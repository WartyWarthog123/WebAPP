let result = "";
fetch("./frontEndData.json")
 .then(function (response) {
  return response.json();
 })
 .then(function (data) {
  appendData(data);
 })
 .catch(function (err) {
  console.log("error: " + err);
 });

function appendData(data) {
 data.forEach(({game_name, game_genre, game_devs, game_series, release_date} = rows) => {
  result += `
       <div class="card">
            <h1 class="card-name">${game_name}</h1>
            <div class="cardImage"><img src="icons/${game_name}.png" width="192" height="192"/></div>
            <div class="cardText>"<p class="card-about">${game_devs} <br/>
               ${game_series} <br/>
               ${game_genre} <br/>
               ${release_date}
            </p>
            </div>
        </div>
       `;
 });
 document.querySelector(".container").innerHTML = result;
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
