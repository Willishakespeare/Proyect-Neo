const electron = require('electron')
const {
  app,
  BrowserWindow
} = electron

const path = require('path')
const url = require('url')

// Enable live reload for Electron too
require('electron-reload')(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`)
});


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

  win.webContents.openDevTools()
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', createWindow)
}


exports.openWindow2 = () => {
  let newWin = new BrowserWindow({
    width: 800,
    height: 400,
    resizable: false,
    frame: false
  })
  newWin.loadURL(url.format({
    pathname: path.join(__dirname, 'src/html/newOrder.html'),
    protocol: 'file',
    slashes: true
  }))
}