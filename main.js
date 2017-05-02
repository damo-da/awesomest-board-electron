'use strict';

var electron = require('electron');
var connect = require('connect');
var serveStatic = require('serve-static');
var fs = require('fs');
var path = require('path');

var port = null;
var mainWindow = null;

var paths = [
    './node_modules/',
    './resources/app/node_modules/'
].filter(fs.existsSync);

if (paths.length > 0) {
    const dist_path = path.join(paths[0], 'awesomest-board/dist');
    console.log('Serving ', dist_path);

    const server = connect()
        .use(serveStatic(dist_path))
        .listen(function () {
            port = server.address().port;
            console.log(server.address());
            console.log('React code served at ', port);

            electron.app.on('ready', function () {
                require('./node_modules/awesomest-board-backend/dist/server');

                mainWindow = new electron.BrowserWindow({width: 800, height: 600});
                mainWindow.loadURL('http://localhost:' + port);
                mainWindow.on('closed', function () {
                    mainWindow = null;
                });
            });
        });

} else {
    console.log('path not found');
}


electron.app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        electron.app.quit();
    }
});


