const CONFIG = require("./config.json");
// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow
} = require('electron');


let mw = null;
class Window extends BrowserWindow {
  constructor() {
    super({
      width: CONFIG.RESOLUTION.WIDTH,
      height: CONFIG.RESOLUTION.HEIGHT
    });
    this.setMenu(null);

    this.loadFile('index.html');

    if (CONFIG.DEV === true) {
      // Open the DevTools.
      this.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    this.on('closed', () => {});
  }

  static create() {
    if (!mw) {
      mw = new Window();
    }
  }
}



app.on('ready', () => Window.create());
app.on('activate', () => Window.create());

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});