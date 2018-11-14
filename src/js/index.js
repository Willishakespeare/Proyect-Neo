const remote = require('electron').remote;
const main = remote.require('./main.js');
const {
  ipcRenderer
} = require('electron');
var obj;
var quanty = 0;

(function handleWindowControls() {


  document.onreadystatechange = () => {
    if (document.readyState == "complete") {
      init();
      loadBoard();
    }
  };

  function init() {
    let window = remote.getCurrentWindow();
    const minButton = document.getElementById('min-button'),
      maxButton = document.getElementById('max-button'),
      restoreButton = document.getElementById('restore-button'),
      closeButton = document.getElementById('close-button');

    minButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.minimize();
    });




    restoreButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.unmaximize();
      toggleMaxRestoreButtons();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation
    // occurs by means other than button clicks e.g. double-clicking
    // the title bar:
    toggleMaxRestoreButtons();
    window.on('maximize', toggleMaxRestoreButtons);
    window.on('unmaximize', toggleMaxRestoreButtons);

    closeButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.close();
    });

    function toggleMaxRestoreButtons() {
      window = remote.getCurrentWindow();
      if (window.isMaximized()) {
        maxButton.style.display = "none";
        restoreButton.style.display = "flex";
      } else {
        restoreButton.style.display = "none";
        maxButton.style.display = "flex";
      }
    }
  }
})();

document.getElementById('buttonNew').addEventListener("click", event => {
  main.openWindow2()
});


document.getElementById('buttonClose').addEventListener("click", event => {
  loadBoard();
});

function loadBoard() {

  const remoteApp = require('electron').remote;
  var Datastore = require('nedb'),
    db = new Datastore({
      filename: remoteApp.app.getPath('documents').concat("/database/base.db"),
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

  let size = Object.size(obj);
  if (size > quanty) {
    quanty = size;
    for (let x in obj) {
      let objSource = obj[x]
      let wip = objSource["wip"];
      let np = objSource["np"];
      let ne = objSource["ne"];
      let turn = objSource["turn"];
      let q = objSource["q"];
      let qe = objSource["qe"];
      let ds = objSource["ds"];
      let de = objSource["de"];
      let ts = objSource["ts"];
      let te = objSource["te"];
      let st = objSource["st"];
      let df = objSource["df"]


      var table = document.getElementById("data_table");
      var table_len = (table.rows.length);
      var row = table.insertRow(table_len).outerHTML =
        "<tr>" +
        "<div class='cellContentAll'>" +
        "<div class='cellContentTitle'>" +
        "<span>" + ne + " </span>" +
        "</div>" +
        "<div class='cellContentDown'>" +
        "<div class='cellContentLeft'>" +
        "<span>Wip (" + wip + ")</span>" +
        "<span>Numero de parte (" + np + ")</span>" +
        "<div class=''>" +
        "<span>Cantidad: " + q + "</span>" +
        "<span>Turno: " + turn + "</span>" +
        "</div>" +
        "</div>" +
        "<div class='cellContentMiddle'>" +
        "<span>Inicio: " + ds + " " + de + "</span>" +
        "<span>Finalizar antes de: " + ts + " " + te + "</span>" +
        "<span>Operadores: " + qe + "</span>" +
        "</div>" +
        "<div class='cellContentRight'>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</tr>";


    }
  }



}


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