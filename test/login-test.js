`use strict`
const sha256 = require('sha256');



module.exports = function(server,should){
	let login_test = {};
	let tc = testcases.login;
	login_test.profileByName = function(uid){

	}
	login_test.profileByToken = function(token,expect){
        server
        .post("/profile")
        .send({"token":token})
        .end(function(err,res){
            if (expect.status==200){
            res.status.should.equal(200);      	
            	if (expect.user.includes('@')){
            		const jug = res.body.email == expect.user;
            		jug.should.equal(true);
            	}
            	else{
            		const jug = res.body.username == expect.user;
            		jug.should.equal(true);
            	}
            }
            else
            	res.status.should.not.equal(200);

        });	
	}

	login_test.test = function(i){
		let _this = this;
	    it("login test case" + i,function(done){
	        server
	        .post("/login")
	        .send({"loginInditify":tc[i][0],"password":tc[i][1]})
	        .end(function(err,res){
	            res.status.should.equal(tc[i][2]);
            	done(_this.profileByToken(res.body.token,{"status":tc[i][2],"user":tc[i][0]}));
	            
	        });
	    });
	}


	login_test.run = function(){
		for (var i=0; i < tc.length; i++){
			if (i!=3){
				let hash = sha256(tc[i][1]);
	            tc[i][1] = hash;
        	}
			this.test(i);
		}
	}

	return login_test;

}