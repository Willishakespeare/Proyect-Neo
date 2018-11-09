const remote = require('electron').remote
const main = remote.require('./main.js');

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
  if (document.getElementById("qInput").value < 1) {
    document.getElementById("qInput").value = 1;
  } else {
    document.getElementById("qInput").value = parseInt(document.getElementById("qInput").value) + 1;
  }

})

document.getElementById("qInputDown").addEventListener("click", function() {
  if (document.getElementById("qInput").value > 1) {

    document.getElementById("qInput").value = parseInt(document.getElementById("qInput").value) - 1;

  } else {
    document.getElementById("qInput").value = 1;
  }

})


document.getElementById("qeInputUp").addEventListener("click", function() {
  if (document.getElementById("qeInput").value < 1) {
    document.getElementById("qeInput").value = 1;
  } else {
    document.getElementById("qeInput").value = parseInt(document.getElementById("qeInput").value) + 1;
  }

})

document.getElementById("qeInputDown").addEventListener("click", function() {
  if (document.getElementById("qeInput").value > 1) {

    document.getElementById("qeInput").value = parseInt(document.getElementById("qeInput").value) - 1;

  } else {
    document.getElementById("qeInput").value = 1;
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
document.getElementById("buttonSaveOrder").addEventListener("click", function() {

  console.log("hi");


  // Import Dexie
  const Dexie = require('dexie');
  // Force debug mode to get async stacks from exceptions.
  Dexie.debug = true; // In production, set to false to increase performance a little.
  //
  // Declare Database
  //
  let db = new Dexie("FriendDatabase");
  db.version(1).stores({
    friends: "++id,name,age"
  });
  //
  // Have Fun
  //
  db.transaction('rw', db.friends, function*() {
    // Make sure we have something in DB:
    if ((yield db.friends.where('name').equals('Josephine').count()) === 0) {
      let id = yield db.friends.add({
        name: "Josephine",
        age: 21
      });
      alert(`Added friend with id ${id}`);
    }
    // Query:
    let youngFriends = yield db.friends.where("age").below(25).toArray();
    // Show result:
    alert("My young friends: " + JSON.stringify(youngFriends));
  }).catch(e => {
    console.error(e.stack);
  });


})
/////////////////////////////////////////////////////////////////////////////