`use strict`

module.exports=function(req,res){
	console.log(req.body);
	let email = req.body.email;
	let pwd = req.body.pwd;
	console.log(email);

	return "hello";
}