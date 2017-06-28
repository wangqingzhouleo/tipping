// nothing
'use strict'
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}
global.usersRequire = function(name) {
	return require(__dirname + '/users/' + name);
}
global.devMode = true;

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/public", express.static(__dirname + "/../public"));


require('./router.js')(app);
usersRequire('users.routes.js')(app);


import {webPara} from '~/configure.js';
const port = webPara.port;
app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!');
})
