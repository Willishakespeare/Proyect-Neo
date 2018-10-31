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

let win

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

  win.webContents.openDevTools()
}

exports.openWindow = () => {
  let newWin = new BrowserWindow({
    width: 400,
    height: 200
  })
  newWin.loadURL(url.format({
    pathname: path.join(__dirname, 'src/html/enupal.html'),
    protocol: 'file',
    slashes: true
  }))
}

app.on('ready', createWindow)