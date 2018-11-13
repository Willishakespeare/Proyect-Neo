const remote = require('electron').remote;
const main = remote.require('./main.js');
const app = require('electron');
const fs = require('fs');
const loadJsonFile = require('load-json-file');

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
  ////////////////////////////////////////////////////////
  var d = new Date();
  var day = d.getDate();
  var months = ["Ene", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  var ds = day + "/" + month + "/" + year;
  var second = d.getSeconds();
  var minute = d.getMinutes();
  var hour = d.getHours();
  var ts = hour + ":" + minute + ":" + second;
  var de;
  var te;
  var std;
  var vacio = "";

  if (wip.trim() == vacio || np.trim() == vacio || ne.trim() == vacio || turn == 0 || q == 0 || qe == 0) {

    main.openWindow3();

  } else {




    var Datastore = require('nedb'),
      db = new Datastore({
        filename: '//192.168.1.206/comun/NO BORRAR/Produccion P28/Plan de Produccion/Proyect Neo/database/numberParts.db',
        autoload: true
      });
    db.loadDatabase(function(err) {});


    db.find({
      Item: np
    }, function(err, record) {
      if (err) {}

      if (isEmpty(record)) {

      } else {
        var rec2 = record[0];
        std = rec2["Std"]
        do_something_when_you_get_your_result();
      }
    });

  }



  function do_something_when_you_get_your_result() {

    let waitTime = (parseFloat(std) * 60) * parseInt(q);
    let tempAllSeconds = (hour * 60) + (minute);
    let allSeconds = tempAllSeconds + waitTime;


    if (allSeconds >= 400) {
      allSeconds = allSeconds + 25;
    }
    if (allSeconds >= 480) {
      allSeconds = allSeconds + 15;
    }
    if (allSeconds >= 720) {
      allSeconds = allSeconds + 35;
    }
    if (allSeconds >= 1440) {
      allSeconds = allSeconds - 1440;
      de = (day + 1) + "/" + month + "/" + year;
    } else {
      de = day + "/" + month + "/" + year;
    }


    let allSecondsTemp = Math.floor(allSeconds / 60);
    let allSecondsHour = allSecondsTemp;
    allSecondsHour = allSecondsTemp * 60;
    let allSecondsMinute = allSeconds - allSecondsHour;



    te = allSecondsTemp + ":" + allSecondsMinute + ":0";
    alert(te);

    const remoteApp = require('electron').remote;


    // var Datastore = require('nedb'),
    //   db = new Datastore({
    //     filename: remoteApp.app.getPath('documents').concat("/database/.base.db"),
    //     autoload: true
    //   });
    // db.loadDatabase(function(err) {});
    //
    // var doc = {
    //   wip: wip,
    //   np: np,
    //   ne: ne,
    //   turn: turn,
    //   q: q,
    //   qe: qe,
    //   ds: ds,
    //   ts: ts,
    //   de: de,
    //   te: te
    // };
    //
    // db.insert(doc, function(err, newDoc) {
    //
    //
    // });


    var Datastore = require('nedb'),
      db = new Datastore({
        filename: '//192.168.1.206/comun/NO BORRAR/Produccion P28/Plan de Produccion/Proyect Neo/database/base.db',
        autoload: true
      });
    db.loadDatabase(function(err) {});

    var doc = {
      wip: wip,
      np: np,
      ne: ne,
      turn: turn,
      q: q,
      qe: qe,
      ds: ds,
      ts: ts,
      de: de,
      te: te
    };

    db.insert(doc, function(err, newDoc) {

      window.close();
    });

  }


})




function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
/////////////////////////////////////////////////////////////////////////////