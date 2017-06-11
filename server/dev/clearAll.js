`use strict`
import MySqlModel from '~/MySqlModel';
const Promise = require('bluebird');


module.exports=function(res){
	let mySqlModel = new MySqlModel();
	mySqlModel.query("DELETE FROM login WHERE uid < 999999999",function(success){
		if (success)
			res.send("Everything deleted");
		else
			res.send("Error deleting");
	});
}