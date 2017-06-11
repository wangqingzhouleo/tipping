`use strict`

const path = require('path');


module.exports = function (app) {


	app.post('/clearall',function(req,res){
		let out = require('./dev/clearAll.js')(res);
	})


	app.get('/', function (req, res) {
		res.send('Hello world');
	});
};