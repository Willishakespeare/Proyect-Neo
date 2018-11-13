const {
  app,
  BrowserWindow
} = require('electron')

app.setName("Proyect Neo");
const path = require('path');
const url = require('url');

let win;
let newWin;
let alertWin;


// Enable live reload for Electron too
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});


function createWindow() {
  win = new BrowserWindow({
    width: 1300,
    height: 700,
    resizable: false,
    frame: false
  })
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/html/index.html'),
    protocol: 'file',
    slashes: true
  }))


}

// var myWindow = null;
// var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
//   if (myWindow) {
//     if (myWindow.isMinimized()) myWindow.restore();
//     myWindow.focus();
//   }
// });
//
// if (shouldQuit) {
//   app.quit();
//   return;
// }
//
//
//
// app.on('window-all-closed', app.quit);
// app.on('before-quit', () => {
//   app.removeAllListeners('close');
//   app.close();
// });

app.on('ready', createWindow);
app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
  app.removeAllListeners('close');
  app.close();
});

exports.openWindow2 = () => {
  newWin = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    frame: false,
    alwaysOnTop: true
  })
  newWin.loadURL(url.format({
    pathname: path.join(__dirname, 'src/html/newOrder.html'),
    protocol: 'file',
    slashes: true
  }))
}


exports.openWindow3 = () => {
  alertWin = new BrowserWindow({
    width: 500,
    height: 200,
    resizable: false,
    frame: false,
    alwaysOnTop: true
  })
  alertWin.loadURL(url.format({
    pathname: path.join(__dirname, 'src/html/alert.html'),
    protocol: 'file',
    slashes: true
  }))
}