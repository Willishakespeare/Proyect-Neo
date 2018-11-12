const remote = require('electron').remote;
const main = remote.require('./main.js');
const app = require('electron');

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


function setFocusToTextBox() {
  document.getElementById("wipInput").focus();
}
window.onload = setFocusToTextBox;

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

//////////////////////////////////////////////////////////////////////////////
document.getElementById("qInputUp").addEventListener("click", function() {
  if (document.getElementById("qInput").value < 0) {
    document.getElementById("qInput").value = 0;
  } else {
    document.getElementById("qInput").value = parseInt(document.getElementById("qInput").value) + 1;
  }

})

document.getElementById("qInputDown").addEventListener("click", function() {
  if (document.getElementById("qInput").value > 0) {

    document.getElementById("qInput").value = parseInt(document.getElementById("qInput").value) - 1;

  } else {
    document.getElementById("qInput").value = 0;
  }

})


document.getElementById("qeInputUp").addEventListener("click", function() {
  if (document.getElementById("qeInput").value < 0) {
    document.getElementById("qeInput").value = 0;
  } else {
    document.getElementById("qeInput").value = parseInt(document.getElementById("qeInput").value) + 1;
  }

})

document.getElementById("qeInputDown").addEventListener("click", function() {
  if (document.getElementById("qeInput").value > 0) {

    document.getElementById("qeInput").value = parseInt(document.getElementById("qeInput").value) - 1;

  } else {
    document.getElementById("qeInput").value = 0;
  }

})
//////////////////////////////////////////////////////////////////////////////

document.getElementById("buttonQ1").addEventListener("click", function() {
  document.getElementById("qInput").value = 1;
})

document.getElementById("buttonQ5").addEventListener("click", function() {
  document.getElementById("qInput").value = 5;
})

document.getElementById("buttonQ10").addEventListener("click", function() {
  document.getElementById("qInput").value = 10;
})
document.getElementById("buttonQ15").addEventListener("click", function() {
  document.getElementById("qInput").value = 15;
})
document.getElementById("buttonQ20").addEventListener("click", function() {
  document.getElementById("qInput").value = 20;
})

//////////////////////////////////////////////////////////////////////////////

document.getElementById("buttonQe1").addEventListener("click", function() {
  document.getElementById("qeInput").value = 1;
})

document.getElementById("buttonQe2").addEventListener("click", function() {
  document.getElementById("qeInput").value = 2;
})

document.getElementById("buttonQe3").addEventListener("click", function() {
  document.getElementById("qeInput").value = 3;
})
document.getElementById("buttonQe4").addEventListener("click", function() {
  document.getElementById("qeInput").value = 4;
})
document.getElementById("buttonQe5").addEventListener("click", function() {
  document.getElementById("qeInput").value = 5;
})

//////////////////////////////////////////////////////////////////////////////

document.getElementById("buttonClearSheet").addEventListener("click", function() {
  document.getElementById("wipInput").value = null;
  document.getElementById("npInput").value = null;
  document.getElementById("neInput").value = null;
  document.getElementById("turnInput").value = 0;
  document.getElementById("qInput").value = 0;
  document.getElementById("qeInput").value = 0;

  document.getElementById("wipInput").focus();
});
//////////////////////////////////////////////////////////////////////////////

document.getElementById("buttonSaveOrder").addEventListener("click", function() {

  var wip = document.getElementById("wipInput").value;
  var np = document.getElementById("npInput").value;
  var ne = document.getElementById("neInput").value;
  var turn = document.getElementById("turnInput").value;
  var q = document.getElementById("qInput").value;
  var qe = document.getElementById("qeInput").value;
  var vacio = "";





  if (wip.trim() == vacio || np.trim() == vacio || ne.trim() == vacio || turn == 0 || q == 0 || qe == 0) {

    main.openWindow3();


  } else {


    var Datastore = require('nedb'),
      db = new Datastore({
        filename: 'database/base.db',
      });
    db.loadDatabase(function(err) {});

    var doc = {
      wip: wip,
      np: np,
      ne: ne,
      turn: turn,
      q: q,
      qe: qe
    };

    db.insert(doc, function(err, newDoc) {

      window.close();
    });


  }






})
/////////////////////////////////////////////////////////////////////////////