const remote = require('electron').remote;
const main = remote.require('./main.js');
const {
  ipcRenderer
} = require('electron');
var obj;
var objUser;
var quanty = 0;
var months = ["Ene", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
var demG;
var dem;

(function handleWindowControls() {


  document.onreadystatechange = () => {
    if (document.readyState == "complete") {
      loadBoard();
    }
  };



})();

document.getElementById('min-button').addEventListener("click", event => {

  let window = remote.getCurrentWindow();
  window.minimize();
});


document.getElementById('close-button').addEventListener("click", event => {
  let window = remote.getCurrentWindow();
  window.close();
});


document.getElementById('buttonNew').addEventListener("click", event => {
  main.openWindow2()
});


document.getElementById('buttonClose').addEventListener("click", event => {





});

function loadBoard() {
  var d = new Date();
  const remoteApp = require('electron').remote;
  var Datastore = require('nedb'),
    db = new Datastore({
      filename: remoteApp.app.getPath('documents') + "/proyectNeo/produccion/" + d.getFullYear() + "/" + months[d.getMonth()] + "/" + d.getDate() + ".db",
      autoload: true
    });
  db.loadDatabase(function(err) {});


  db.find({}, function(err, record) {
    if (err) {}

    if (isEmpty(record)) {

    } else {
      obj = record;
      objFunction();
    }
  });

}

ipcRenderer.on('updateRec', (event, arg) => {

  if (arg === true) {
    loadBoard();
  }
});



function objFunction() {

  var Datastore = require('nedb'),
    db = new Datastore({
      filename: '//192.168.1.206/comun/NO BORRAR/Produccion P28/Plan de Produccion/Proyect Neo/database/users.db',
      autoload: true
    });
  db.loadDatabase(function(err) {});


  db.find({}, function(err, record) {
    if (err) {}

    if (isEmpty(record)) {

    } else {

      objUser = record;
      objUserFunction();

    }
  });

}

function objUserFunction() {

  dem = 0;


  for (let z = 1; z <= demG; z++) {
    var elmtTable = document.getElementById("cellContentId" + z);
    elmtTable.remove();
  }
  for (let z = 1; z <= demG; z++) {
    var elmtTable = document.getElementById("demo" + z);
    elmtTable.remove();
  }


  let size = Object.size(obj);
  if (size > quanty) {
    quanty = size;
    for (let x in obj) {
      let objSource = obj[x]
      let wip = objSource["wip"];
      let np = objSource["np"];
      let ne = objSource["ne"];
      let neExtended;
      let turn = objSource["turn"];
      let q = objSource["q"];
      let qe = objSource["qe"];
      let ds = objSource["ds"];
      let de = objSource["de"];
      let ts = objSource["ts"];
      let te = objSource["te"];
      let st = objSource["st"];
      let df = objSource["df"]
      let tag;
      let turnExtended;

      let varFound;

      if (turn == 1) {
        turnExtended = "Turno: 1 (6:40AM - 4:30PM)"
      }
      if (turn == 2) {
        turnExtended = "Turno 2 (4:30AM - 1:40PM)"
      }
      if (turn == 3) {
        turnExtended = "Turno 3 (6:40AM - 6:40PM)"
      }
      if (turn == 3) {
        turnExtended = "Turno 4 (6:40AM - 6:40PM)"
      }

      for (let x in objUser) {
        let xrec = objUser[x];
        let mtkTag = xrec["mtkTag"];
        let baeTag = xrec["baeTag"];
        if (mtkTag == ne || baeTag == ne) {
          neExtended = xrec["name"];
          tag = xrec["tag"];
          varFound = true;
        }
      }

      if (varFound = false) {
        user = "Usuario no Registrado";
        tag = ne;

      }
      dem = dem + 1;
      demG = dem;

      var table = document.getElementById("data_table");
      var table_len = (table.rows.length);
      var row = table.insertRow(table_len).outerHTML =
        "<tr id = 'trTable'>" +
        "<div class='cellContentAll' id='cellContentId" + dem + "'>" +
        "<div class='cellContentTitle'>" +
        "<span>" + neExtended + " (" + tag + ") " + " </span>" +
        "</div>" +
        "<div class='cellContentDown'>" +
        "<div class='cellContentLeft'>" +
        "<span>Wip (" + wip + ")</span>" +
        "<span>Numero de parte (" + np + ")</span>" +
        "<div class=''>" +
        "<span>Cantidad: " + q + " " + "</span>" +
        "<span>" + turnExtended + "</span>" +
        "</div>" +
        "</div>" +
        "<div class='cellContentMiddle'>" +
        "<span>Inicio: " + ds + " " + ts + "</span>" +
        "<span>Finalizar antes de: " + de + " " + te + "</span>" +
        "<span>Operadores: " + qe + "</span>" +
        "</div>" +
        "<div class='cellContentRight'>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</tr>";
      document.getElementById("boxListWorks").insertAdjacentHTML('afterbegin', "<p id='demo" + dem + "'></p>");

    }


  }

}




// Update the count down every 1 second
var x = setInterval(function() {

  for (let x = 1; x <= demG; x++) {

    let xrec = obj[x - 1];
    var rest = xrec["de"].split("/");
    var rest2 = xrec["te"];
    var str = rest[0] + " " + rest[1] + " " + rest[2] + " " + rest2;
    var countDownDate = new Date(str).getTime();

    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);



    document.getElementById("demo" + x).innerHTML = days + "d " + hours + "h " +
      minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";

    }


  }
}, 1000);



function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};