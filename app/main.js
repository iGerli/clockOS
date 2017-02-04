const electron = require('electron');
const path = require('path');

const { app, BrowserWindow } = electron;

// simple parameters initialization
const electronConfig = {
  URL_LAUNCHER_TOUCH: process.env.URL_LAUNCHER_TOUCH === '1' ? 1 : 0,
  URL_LAUNCHER_TOUCH_SIMULATE: process.env.URL_LAUNCHER_TOUCH_SIMULATE === '1' ? 1 : 0,
  URL_LAUNCHER_FRAME: process.env.URL_LAUNCHER_FRAME === '1' ? 1 : 0,
  URL_LAUNCHER_KIOSK: process.env.URL_LAUNCHER_KIOSK === '1' ? 1 : 0,
  URL_LAUNCHER_NODE: process.env.URL_LAUNCHER_NODE === '1' ? 1 : 0,
  URL_LAUNCHER_WIDTH: parseInt(process.env.URL_LAUNCHER_WIDTH || 1920, 10),
  URL_LAUNCHER_HEIGHT: parseInt(process.env.URL_LAUNCHER_HEIGHT || 1080, 10),
  URL_LAUNCHER_TITLE: process.env.URL_LAUNCHER_TITLE || 'RESIN.IO',
  URL_LAUNCHER_CONSOLE: process.env.URL_LAUNCHER_CONSOLE === '1' ? 1 : 0,
  URL_LAUNCHER_URL: process.env.URL_LAUNCHER_URL || 'file:////usr/src/app/data/index.html',
  URL_LAUNCHER_ZOOM: parseFloat(process.env.URL_LAUNCHER_ZOOM || 1.0),
  URL_LAUNCHER_OVERLAY_SCROLLBARS: process.env.URL_LAUNCHER_CONSOLE === '1' ? 1 : 0,
};

// enable touch events if your device supports them
if (electronConfig.URL_LAUNCHER_TOUCH) {
  app.commandLine.appendSwitch('--touch-devices');
}
// simulate touch events - might be useful for touchscreen with partial driver support
if (electronConfig.URL_LAUNCHER_TOUCH_SIMULATE) {
  app.commandLine.appendSwitch('--simulate-touch-screen-with-mouse');
}

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  Object.assign(electronConfig, {
    URL_LAUNCHER_URL: `file:///${path.join(__dirname, 'data', 'index.html')}`,
    URL_LAUNCHER_HEIGHT: 600,
    URL_LAUNCHER_WIDTH: 800,
    URL_LAUNCHER_KIOSK: 0,
    URL_LAUNCHER_CONSOLE: 1,
    URL_LAUNCHER_FRAME: 1,
  });
}

/*
 we initialize our application display as a callback of the electronJS "ready" event
 */
let window;

app.on('ready', () => {
  // here we actually configure the behavour of electronJS
  window = new BrowserWindow({
    width: electronConfig.URL_LAUNCHER_WIDTH,
    height: electronConfig.URL_LAUNCHER_HEIGHT,
    frame: !!(electronConfig.URL_LAUNCHER_FRAME),
    title: electronConfig.URL_LAUNCHER_TITLE,
    kiosk: !!(electronConfig.URL_LAUNCHER_KIOSK),
    webPreferences: {
      nodeIntegration: !!(electronConfig.URL_LAUNCHER_NODE),
      zoomFactor: electronConfig.URL_LAUNCHER_ZOOM,
      overlayScrollbars: !!(electronConfig.URL_LAUNCHER_OVERLAY_SCROLLBARS),
    },
  });

  window.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      window.show();
    }, 300);

    // Forget Splashscreen
    setTimeout(() => {
      window.webContents.clearHistory();
    }, 1000);
  });

  // if the env-var is set to true,
  // a portion of the screen will be dedicated to the chrome-dev-tools
  if (electronConfig.URL_LAUNCHER_CONSOLE) {
    window.openDevTools();
  }

  // the big red button, here we go
  window.loadURL(electronConfig.URL_LAUNCHER_URL);
});

// clockOS Code

// PiPins
const piPins = require('pi-pins');
const robot = require('robotjs');

const navButtonPins = {
  upButton: 16,
  downButton: 17,
  backButton: 27,
  selectButton: 22,
};

const navButtons = {
  upButton: piPins.connect(navButtonPins.upButton),
  downButton: piPins.connect(navButtonPins.downButton),
  backButton: piPins.connect(navButtonPins.backButton),
  selectButton: piPins.connect(navButtonPins.selectButton),
};

for (const key in navButtons) {
  // Loopthrough navButtons
  if (navButtons.hasOwnProperty(key)) {
    navButtons[key].mode('in');


    switch (key) {
      case 'upButton':
        // Tab
        navButtons[key].on('rise', () => {
          robot.keyTap('tab', 'shift');
        });
        break;
      case 'downButton':
      // Shift+tab
        navButtons[key].on('rise', () => {
          robot.keyTap('tab');
        });
        break;
      case 'backButton':
        // History back
        navButtons[key].on('rise', () => {
          if (window.webContents.canGoBack()) {
            window.webContents.goBack();
          }
        });
        break;
      case 'selectButton':
        // Enter
        navButtons[key].on('rise', () => {
          robot.keyTap('enter');
        });
        break;
      default:
    }
  }
}
