function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
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

  var portraits = document.querySelectorAll(".main_portraits");
  for (var i = 0; i < portraits.length; i++) {
    portraits[i].addEventListener(
      "click",
      //wrapper fgv, ami ahhoz kell, hogy atadjuk az event parametert
      function(event) {
        //a livingChaaracters-t latni akarjuk a getDetails fgv-en belul, ezert at kell adni parameterkent
        //szukseg van az eventre is, hogy tudjuk mire kattintottunk, ezert azt is at kell adni parameterkent, ehhez kellett a wrapper
        getDetails(living, event.target.alt);
      }
    );
  }
  var usersearchbutton = document.querySelector("#usersearchbutton");
  usersearchbutton.addEventListener("click", function() {
    var inputdata = document.querySelector("#usersearch").value;
    search(inputdata, living);
  });
}

getGameOfThronesCharacterDatas(
  "./json/got.json",
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function putArrayInOrder(userDatas) {
  userDatas.sort(function(first, second) {
    if (first.name > second.name) {
      return 1;
    }
    return -1;
  });
  filterOnlyAlive(userDatas);
}

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

function getDetails(living, name) {
  var detail = "";
  for (var i = 0; i < living.length; i++) {
    if (living[i].name.toLowerCase() === name.toLowerCase()) {
      detail += `
      <div class="main_portraits">
      <img src="${living[i].picture}" alt="${living[i].name}">
      <p>${living[i].name}</p>
      <p>${living[i].bio}</p>
      </div>
      `;
    } else {
      detail = "Character not found";
    }
    document.querySelector("#detail").innerHTML = detail;
  }
}

function search(inputdata, living) {
  getDetails(living, inputdata);
  console.log(inputdata);
}
