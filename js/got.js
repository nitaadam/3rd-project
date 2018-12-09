function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  var living = filterOnlyAlive(userDatas);
  putArrayInOrder(living);
  charactersPortrait(living);
  searchfunction(living);
  eventListenerOnPortraits(living);
}

getGameOfThronesCharacterDatas(
  "./json/got.json",
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

//Karakterek sorba rendezése:
function putArrayInOrder(userDatas) {
  userDatas.sort(function (first, second) {
    if (first.name > second.name) {
      return 1;
    }
    return -1;
  });
  filterOnlyAlive(userDatas);
}

//Élő karakterek kiszűrése:
function filterOnlyAlive(userDatas) {
  var aliveUserDatas = [];
  for (var i = 0; i < userDatas.length; i++) {
    if (userDatas[i].dead !== true) {
      aliveUserDatas.push(userDatas[i]);
    }
  }
  console.log(aliveUserDatas);
  return aliveUserDatas;
}

//Portrék és nevek megjelenítése:
function charactersPortrait(aliveUserDatas) {
  var portraitRowElement = document.querySelector("#mainarea");
  var portraitRow = "";
  for (var i = 0; i < aliveUserDatas.length; i += 1) {
    portraitRow += ` 
                    <div class="mainPortraits">
                        <img src="${aliveUserDatas[i].portrait}" alt="${
      aliveUserDatas[i].name
    }"> <br> 
                        ${aliveUserDatas[i].name}
                        </div>
                  `;
  }
  portraitRowElement.innerHTML = portraitRow;
}

//Kereső hozzáadása gombra kattintásra:
function searchfunction(userDatas) {
  var usersearchbutton = document.querySelector("#usersearchbutton");
  usersearchbutton.addEventListener("click", function x() {
    search(userDatas);
  });
}

//Sikeres keresés:
function displaycharacter(searchedCharacter) {
  var profile = document.getElementById("sidedetail");
  var house = "";
  if (searchedCharacter[0].house) {
    house = `<img src = "/assets/houses/${searchedCharacter[0].house}.png">`;
  } else {
    house = "";
  }
  profile.innerHTML = `${house}<div class="sidearea_info"> ${
    searchedCharacter[0].name
  } </div> <br>
  <img src = "/${searchedCharacter[0].picture}"> <br>
  <div class="sidearea_bio"> ${searchedCharacter[0].bio}</div><br>`;
  document.getElementById("usersearch").value = "";
}

//Sikertelen keresés:
function displaynotfound() {
  var sidedetail = document.getElementById("sidedetail");
  sidedetail.innerHTML = "Character not found";
  document.getElementById("usersearch").value = "";
}

//Keresés:
function search(userDatas) {
  var searchedCharacter = [];
  var searchterm = document.querySelector("#usersearch").value;
  var found = false;
  for (var k in userDatas) {
    if (userDatas.hasOwnProperty(k)) {
      if (userDatas[k].name.toLowerCase() === searchterm.toLowerCase()) {
        searchedCharacter.push(userDatas[k]);
        displaycharacter(searchedCharacter);
        found = true;
        break;
      }
    }
  }
  if (found === false) {
    displaynotfound();
  }
}

//Képre kattintáskor:
function eventListenerOnPortraits(userDatas) {
  var clickOnImages = document.querySelectorAll(".mainPortraits");
  for (var i = 0; i < clickOnImages.length; i += 1) {
    clickOnImages[i].addEventListener("click", function x() {
      clickOnCharacters(userDatas, this.alt);
    });
  }
}

function clickOnCharacters(userDatas, character) {
  var sidearea = document.querySelector(".sidedetail");
  for (var i = 0; i < userDatas.length; i += 1) {
    if (userDatas[i].name === character) {
      searchedCharacter(userDatas[i], sidearea);
    }
  }
}