import {app, BrowserWindow} from 'electron';
import connect from 'connect';
import serveStatic from 'serve-static';

let port = null;
let mainWindow = null;

const server = connect()
    .use(serveStatic('./node_modules/awesomest-board/dist'))
    .listen(() => {
        port = server.address().port;

        app.on('ready', () => {
            require('./node_modules/awesomest-board-backend/dist/server');

            mainWindow = new BrowserWindow({width: 800, height: 600});
            mainWindow.loadURL('http://localhost:' + port);
            mainWindow.on('closed', () => {
                mainWindow = null;
            });
        });
    });

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});


