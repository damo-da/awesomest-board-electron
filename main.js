import { app, BrowserWindow } from 'electron';
import connect from 'connect';
import serveStatic from 'serve-static';

const PORT = 34577;

let mainWindow = null;

connect()
    .use(serveStatic('./node_modules/awesomest-board/dist'))
    .listen(PORT, () => {
        console.log('Server running on ', PORT, '...');
    });

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('http://localhost:'+PORT);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
