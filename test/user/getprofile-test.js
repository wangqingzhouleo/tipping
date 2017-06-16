`use strict`
const sha256 = require('sha256');



module.exports = function(server,should){
	let getpro_test = {};
	let tc = testcases.login;
	getpro_test.profileByName = function(uid){

	}
	getpro_test.profileByToken = function(token,i){
        server
        .post("/profile")
        .send({"token":token})
        .end(function(err,res){
            if (tc[i][2]==200){
            	// console.log(i);
            	// res.status.should.equal(200); 	
            	if (tc[0][0].includes('@')){
            		const jug = res.body.profile.email == tc[0][0];
            		jug.should.equal(true);
            	}
            	else{
            		const jug = res.body.profile.username == tc[0][0];
            		jug.should.equal(true);
            	}
            }
            // else
            // 	res.status.should.not.equal(200);

        });	
	}

	getpro_test.test = function(i){
		let _this = this;
	    it("get profile test" + i,function(done){
	        server
	        .post("/login")
	        .send({"loginInditify":tc[i][0],"password":tc[i][1]})
	        .end(function(err,res){
	        	// console.log(res.body);
	            done(_this.profileByToken(res.body.token, i));            
	        });
	    });
	}


	getpro_test.run = function(){
		for (var i=0; i < tc.length; i++){
			if (i!=3){
				let hash = sha256(tc[i][1]);
	            tc[i][1] = hash;
        	}
			this.test(i);
		}
	}

	return getpro_test;

}