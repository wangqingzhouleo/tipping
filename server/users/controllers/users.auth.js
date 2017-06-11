`use strict`
import UserAuth from '~/SqlUserAuth';


module.exports=function(req,res){
	let mySqlModel = new UserAuth(req.body);

	mySqlModel.signup(message => {
		res.send(message);		
	});
}