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
  var aliveCharacters = filterOnlyAlive(userDatas);
  charactersPortrait(aliveCharacters);
}

getGameOfThronesCharacterDatas(
  "./json/got.json",
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
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

function putArrayInOrder(userDatas) {
  userDatas.sort(function (first, second) {
    if (first.name > second.name) {
      return 1;
    }
    return -1;

  });
  filterOnlyAlive(userDatas);
}

function charactersPortrait(aliveUserDatas) {
  var portraitRowElement = document.querySelector('#mainarea');
  var portraitRow = '';
  for (var i = 0; i < aliveUserDatas.length; i += 1) {
    portraitRow +=
      ` 
                    <div class="mainPortraits">
                        <img src="${aliveUserDatas[i].portrait}" alt="${aliveUserDatas[i].name}"> <br> 
                        ${aliveUserDatas[i].name}
                        </div>
                  `;
  }
  portraitRowElement.innerHTML = portraitRow;
}