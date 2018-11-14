const remote = require('electron').remote
const main = remote.require('./main.js');
const {
  ipcRenderer
} = require('electron');


document.getElementById('buttonClose').addEventListener("click", event => {
  window.close();
});

ipcRenderer.on('action-update-label', (event, arg) => {

  document.getElementById('titleAlert').innerHTML = arg;
});
/////////////////////////////////////////////////////////////////////////////