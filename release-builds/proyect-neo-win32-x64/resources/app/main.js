const electron = require('electron')
const {
  app,
  BrowserWindow
} = electron

const path = require('path')
const url = require('url')

// // Enable live reload for Electron too
// require('electron-reload')(__dirname, {
//   electron: require(`${__dirname}/node_modules/electron`)
// });


function createWindow() {
  let win = new BrowserWindow({
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

var myWindow = null;
var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore();
    myWindow.focus();
  }
});

if (shouldQuit) {
  app.quit();
  return;
}
app.on('ready', createWindow)

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
  app.removeAllListeners('close');
  app.close();
});

app.on('closed', () => app.quit());

exports.openWindow2 = () => {
  let newWin = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    frame: false
  })
  newWin.loadURL(url.format({
    pathname: path.join(__dirname, 'src/html/newOrder.html'),
    protocol: 'file',
    slashes: true
  }))
}