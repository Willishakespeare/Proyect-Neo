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
var stade = 0;

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

document.getElementById('btnLoop').addEventListener("click", event => {

  loadBoard();
})


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



  if (stade == 0) {
    stade = stade + 1;
    printCardBoard();
  } else {
    clearboard();
    printCardBoard();
  }

}




// Update the count down every 1 second
var x = setInterval(function() {

  for (let x = 1; x <= Object.size(obj); x++) {

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

      document.getElementById("demo" + x).innerHTML = "EXPIRED";

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

function printCardBoard() {

  dem = 0;
  let size = Object.size(obj);
  if (size >= quanty) {
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
      let df = objSource["df"];
      let gen;
      let tag;
      let turnExtended1;
      let turnExtended2;
      let varFound;

      if (turn == 1) {
        turnExtended1 = "Turno: 1"
        turnExtended2 = "(6:40AM - 4:30PM)"
      }
      if (turn == 2) {
        turnExtended1 = "Turno 2"
        turnExtended2 = "(4:30AM - 1:40PM)"
      }
      if (turn == 3) {
        turnExtended1 = "Turno 3"
        turnExtended2 = "(6:40AM - 6:40PM)"
      }
      if (turn == 3) {
        turnExtended1 = "Turno 4"
        turnExtended2 = "(6:40AM - 6:40PM)"
      }

      for (let x in objUser) {
        let xrec = objUser[x];
        let mtkTag = xrec["mtkTag"];
        let baeTag = xrec["baeTag"];

        if (mtkTag == ne || baeTag == ne) {
          neExtended = xrec["name"];
          tag = xrec["tag"];
          gen = xrec["gen"];
          varFound = true;
        }
      }

      if (varFound = false) {
        user = "Usuario no Registrado";
        gen = xrec["gen"];
        tag = ne;

      }
      dem = dem + 1;
      demG = dem;

      if (st == 1) {
        var table = document.getElementById("data_table");
        var table_len = (table.rows.length);
        var row = table.insertRow(table_len).outerHTML =
          "<tr class='Tabletr' id = 'trTable" + dem + "'" + ">" +
          "	<div class='cellContentAll' id='cellContentAllId" + dem + "' >" +
          "<div class='cellContentTitle'>" +
          "	<span>" + neExtended + "</span>" +
          "</div>" +
          "<div class='cellContentDown'>" +
          "<div class='cellContentIcon'>" +
          "<img class='cellContentImage ' src='../image/boardCards/user" + gen + ".png' draggable='false'></img>" +
          "</div>" +
          "<div class='cellContentDivider'>" +
          "</div>" +
          "<div class='cellContentLeft'>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Wip:</span>" +
          "<span class='cellContentText2'>(" + wip + ")</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Numero de Parte:</span>" +
          "<span class='cellContentText2'>" + np + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>" + turnExtended1 + ":</span>" +
          "<span class='cellContentText2'> " + turnExtended2 + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Cantidad:</span>" +
          "<span class='cellContentText2'> " + q + "</span>" +
          "</div>" +
          "</div>" +
          "<div class='cellContentDivider'>" +
          "</div>" +
          "<div class='cellContentMiddle'>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Inicio:</span>" +
          "<span class='cellContentText2'> " + ds + " " + ts + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Finalizar Antes de:</span>" +
          "<span class='cellContentText2'>" + de + " " + te + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Operadores:</span>" +
          "<span class='cellContentText2'> " + qe + "</span>" +
          "</div>" +
          "</div>" +
          "<div class='cellContentDivider'>" +
          "</div>" +
          "<div class='cellContentRight'>" +
          "<div class='tagInProcess'>" +
          "<span class='statusTag'>En Proceso</span>" +
          "</div>" +
          "<div class='tagButtons '>" +
          "<div class='tabBoxIcons' ripple='ripple'>" +
          "<i class='material-icons iconsTag '>open_in_new</i>" +
          "</div>" +
          "<div class='tabBoxIcons' ripple='ripple'>" +
          "<i class='material-icons iconsTag'>insert_comment</i>" +
          "</div>" +
          "<div class='tabBoxIcons' ripple='ripple'>" +
          "<i class='material-icons iconsTag'>more_vert</i>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</tr>";



        document.getElementById("boxListWorks").insertAdjacentHTML('afterbegin', "<p id='demo" + dem + "'></p>");

      }

      if (st == 2) {
        var table = document.getElementById("data_table");
        var table_len = (table.rows.length);
        var row = table.insertRow(table_len).outerHTML =
          "<tr class='Tabletr' id = 'trTable" + dem + "'" + ">" +
          "	<div class='cellContentAll' id='cellContentAllId" + dem + "' >" +
          "<div class='cellContentTitle'>" +
          "	<span>" + neExtended + "</span>" +
          "</div>" +
          "<div class='cellContentDown'>" +
          "<div class='cellContentIcon'>" +
          "<img class='cellContentImage ' src='../image/boardCards/user" + gen + ".png' draggable='false'></img>" +
          "</div>" +
          "<div class='cellContentDivider'>" +
          "</div>" +
          "<div class='cellContentLeft'>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Wip:</span>" +
          "<span class='cellContentText2'>(" + wip + ")</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Numero de Parte:</span>" +
          "<span class='cellContentText2'>" + np + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>" + turnExtended1 + ":</span>" +
          "<span class='cellContentText2'> " + turnExtended2 + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Cantidad:</span>" +
          "<span class='cellContentText2'> " + q + "</span>" +
          "</div>" +
          "</div>" +
          "<div class='cellContentDivider'>" +
          "</div>" +
          "<div class='cellContentMiddle'>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Inicio:</span>" +
          "<span class='cellContentText2'> " + ds + " " + ts + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Finalizar Antes de:</span>" +
          "<span class='cellContentText2'>" + de + " " + te + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Operadores:</span>" +
          "<span class='cellContentText2'> " + qe + "</span>" +
          "</div>" +
          "</div>" +
          "<div class='cellContentDivider'>" +
          "</div>" +
          "<div class='cellContentRight'>" +
          "<div class='tagInPause'>" +
          "<span class='statusTag'>Orden Pausada</span>" +
          "</div>" +
          "<div class='tagButtons '>" +
          "<div class='tabBoxIcons' ripple='ripple'>" +
          "<i class='material-icons iconsTag '>open_in_new</i>" +
          "</div>" +
          "<div class='tabBoxIcons' ripple='ripple'>" +
          "<i class='material-icons iconsTag'>insert_comment</i>" +
          "</div>" +
          "<div class='tabBoxIcons' ripple='ripple'>" +
          "<i class='material-icons iconsTag'>more_vert</i>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</tr>";
        document.getElementById("boxListWorks").insertAdjacentHTML('afterbegin', "<p id='demo" + dem + "'></p>");

      }

      if (st == 3) {
        var table = document.getElementById("data_table");
        var table_len = (table.rows.length);
        var row = table.insertRow(table_len).outerHTML =
          "<tr class='Tabletr' id = 'trTable" + dem + "'" + ">" +
          "	<div class='cellContentAll' id='cellContentAllId" + dem + "' >" +
          "<div class='cellContentTitle'>" +
          "	<span>" + neExtended + "</span>" +
          "</div>" +
          "<div class='cellContentDown'>" +
          "<div class='cellContentIcon'>" +
          "<img class='cellContentImage ' src='../image/boardCards/user" + gen + ".png' draggable='false'></img>" +
          "</div>" +
          "<div class='cellContentDivider'>" +
          "</div>" +
          "<div class='cellContentLeft'>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Wip:</span>" +
          "<span class='cellContentText2'>(" + wip + ")</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Numero de Parte:</span>" +
          "<span class='cellContentText2'>" + np + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>" + turnExtended1 + ":</span>" +
          "<span class='cellContentText2'> " + turnExtended2 + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Cantidad:</span>" +
          "<span class='cellContentText2'> " + q + "</span>" +
          "</div>" +
          "</div>" +
          "<div class='cellContentDivider'>" +
          "</div>" +
          "<div class='cellContentMiddle'>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Inicio:</span>" +
          "<span class='cellContentText2'> " + ds + " " + ts + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Finalizar Antes de:</span>" +
          "<span class='cellContentText2'>" + de + " " + te + "</span>" +
          "</div>" +
          "<div class='cellContentBoxText'>" +
          "<span class='cellContentText1'>Operadores:</span>" +
          "<span class='cellContentText2'> " + qe + "</span>" +
          "</div>" +
          "</div>" +
          "<div class='cellContentDivider'>" +
          "</div>" +
          "<div class='cellContentRight'>" +
          "<div class='tagInLater'>" +
          "<span class='statusTag'>Orden Tardia</span>" +
          "</div>" +
          "<div class='tagButtons '>" +
          "<div class='tabBoxIcons' ripple='ripple'>" +
          "<i class='material-icons iconsTag '>open_in_new</i>" +
          "</div>" +
          "<div class='tabBoxIcons' ripple='ripple'>" +
          "<i class='material-icons iconsTag'>insert_comment</i>" +
          "</div>" +
          "<div class='tabBoxIcons' ripple='ripple'>" +
          "<i class='material-icons iconsTag'>more_vert</i>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</tr>";
        document.getElementById("boxListWorks").insertAdjacentHTML('afterbegin', "<p id='demo" + dem + "'></p>");

      }

      if (st == 4) {
        if (df < 0) {
          var table = document.getElementById("data_table");
          var table_len = (table.rows.length);
          var row = table.insertRow(table_len).outerHTML =
            "<tr class='Tabletr' id = 'trTable" + dem + "'" + ">" +
            "	<div class='cellContentAll' id='cellContentAllId" + dem + "' >" +
            "<div class='cellContentTitle'>" +
            "	<span>" + neExtended + "</span>" +
            "</div>" +
            "<div class='cellContentDown'>" +
            "<div class='cellContentIcon'>" +
            "<img class='cellContentImage ' src='../image/boardCards/user" + gen + ".png' draggable='false'></img>" +
            "</div>" +
            "<div class='cellContentDivider'>" +
            "</div>" +
            "<div class='cellContentLeft'>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Wip:</span>" +
            "<span class='cellContentText2'>(" + wip + ")</span>" +
            "</div>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Numero de Parte:</span>" +
            "<span class='cellContentText2'>" + np + "</span>" +
            "</div>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>" + turnExtended1 + ":</span>" +
            "<span class='cellContentText2'> " + turnExtended2 + "</span>" +
            "</div>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Cantidad:</span>" +
            "<span class='cellContentText2'> " + q + "</span>" +
            "</div>" +
            "</div>" +
            "<div class='cellContentDivider'>" +
            "</div>" +
            "<div class='cellContentMiddle'>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Inicio:</span>" +
            "<span class='cellContentText2'> " + ds + " " + ts + "</span>" +
            "</div>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Finalizar Antes de:</span>" +
            "<span class='cellContentText2'>" + de + " " + te + "</span>" +
            "</div>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Operadores:</span>" +
            "<span class='cellContentText2'> " + qe + "</span>" +
            "</div>" +
            "</div>" +
            "<div class='cellContentDivider'>" +
            "</div>" +
            "<div class='cellContentRight'>" +
            "<div class='tagInClosedLater'>" +
            "<span class='statusTag'>Orden Cerrada (" + df + " min Des.)</span>" +
            "</div>" +
            "<div class='tagButtons '>" +
            "<div class='tabBoxIcons' ripple='ripple'>" +
            "<i class='material-icons iconsTag '>open_in_new</i>" +
            "</div>" +
            "<div class='tabBoxIcons' ripple='ripple'>" +
            "<i class='material-icons iconsTag'>insert_comment</i>" +
            "</div>" +
            "<div class='tabBoxIcons' ripple='ripple'>" +
            "<i class='material-icons iconsTag'>more_vert</i>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</tr>";
          document.getElementById("boxListWorks").insertAdjacentHTML('afterbegin', "<p id='demo" + dem + "'></p>");

        }

        if (df >= 0) {
          var table = document.getElementById("data_table");
          var table_len = (table.rows.length);
          var row = table.insertRow(table_len).outerHTML =
            "<tr class='Tabletr' id = 'trTable" + dem + "'" + ">" +
            "	<div class='cellContentAll' id='cellContentAllId" + dem + "' >" +
            "<div class='cellContentTitle'>" +
            "	<span>" + neExtended + "</span>" +
            "</div>" +
            "<div class='cellContentDown'>" +
            "<div class='cellContentIcon'>" +
            "<img class='cellContentImage ' src='../image/boardCards/user" + gen + ".png' draggable='false'></img>" +
            "</div>" +
            "<div class='cellContentDivider'>" +
            "</div>" +
            "<div class='cellContentLeft'>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Wip:</span>" +
            "<span class='cellContentText2'>(" + wip + ")</span>" +
            "</div>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Numero de Parte:</span>" +
            "<span class='cellContentText2'>" + np + "</span>" +
            "</div>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>" + turnExtended1 + ":</span>" +
            "<span class='cellContentText2'> " + turnExtended2 + "</span>" +
            "</div>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Cantidad:</span>" +
            "<span class='cellContentText2'> " + q + "</span>" +
            "</div>" +
            "</div>" +
            "<div class='cellContentDivider'>" +
            "</div>" +
            "<div class='cellContentMiddle'>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Inicio:</span>" +
            "<span class='cellContentText2'> " + ds + " " + ts + "</span>" +
            "</div>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Finalizar Antes de:</span>" +
            "<span class='cellContentText2'>" + de + " " + te + "</span>" +
            "</div>" +
            "<div class='cellContentBoxText'>" +
            "<span class='cellContentText1'>Operadores:</span>" +
            "<span class='cellContentText2'> " + qe + "</span>" +
            "</div>" +
            "</div>" +
            "<div class='cellContentDivider'>" +
            "</div>" +
            "<div class='cellContentRight'>" +
            "<div class='tagInClosed'>" +
            "<span class='statusTag'>Orden Cerrada (" + df + " min Ant.)</span>" +
            "</div>" +
            "<div class='tagButtons '>" +
            "<div class='tabBoxIcons' ripple='ripple'>" +
            "<i class='material-icons iconsTag '>open_in_new</i>" +
            "</div>" +
            "<div class='tabBoxIcons' ripple='ripple'>" +
            "<i class='material-icons iconsTag'>insert_comment</i>" +
            "</div>" +
            "<div class='tabBoxIcons' ripple='ripple'>" +
            "<i class='material-icons iconsTag'>more_vert</i>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</tr>";
          document.getElementById("boxListWorks").insertAdjacentHTML('afterbegin', "<p id='demo" + dem + "'></p>");

        }
      }


    }


  }

}

function clearboard() {

  if (Object.size(obj) > 0) {
    for (let z = 1; z <= Object.size(obj); z++) {
      document.getElementById("trTable" + z).remove();
      document.getElementById("demo" + z).remove();
      document.getElementById("cellContentAllId" + z).remove();
    }
  }

}