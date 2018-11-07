const remote = require('electron').remote
const main = remote.require('./main.js');




document.getElementById("wipInput").addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    event.preventDefault();
    document.getElementById("npInput").focus();
  }
});



document.getElementById("npInput").addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    event.preventDefault();
    document.getElementById("neInput").focus();
  }
});


document.getElementById("neInput").addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    event.preventDefault();
    document.getElementById("turnInput").focus();
  }
});


document.getElementById("turnInput").addEventListener("change", function() {
  event.preventDefault();
  document.getElementById("qInput").focus();
});

document.getElementById("qInput").addEventListener("focus", function() {
  document.getElementById("qInput").addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
      event.preventDefault();
      document.getElementById("qeInput").focus();
    }
  });
});



(function handleWindowControls() {


  document.onreadystatechange = () => {
    if (document.readyState == "complete") {
      init();
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