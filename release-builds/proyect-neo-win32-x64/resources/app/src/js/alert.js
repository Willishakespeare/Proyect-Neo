const remote = require('electron').remote
const main = remote.require('./main.js');



document.getElementById('buttonClose').addEventListener("click", event => {
  window.close();
});


/////////////////////////////////////////////////////////////////////////////