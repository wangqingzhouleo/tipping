'use strict'
const express = require('express');
const app = express();
const configure = require('./configure.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/public", express.static(__dirname + "/../public"));
const router = require('./router.js')(app);


const port = configure.getWebPara().port;
app.listen(port, function () {
	console.log('Example app listening on port 3000!')
})