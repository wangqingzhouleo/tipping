`use strict`
const sha256 = require('sha256');


module.exports = function(server,should){
	let login_test = {};
	let tc = testcases.login;
	login_test.test = function(i,callback){	
	    it("login test case" + i,function(done){
	        server
	        .post("/login")
	        .send({"loginInditify":tc[i][0],"password":tc[i][1]})
	        .end(function(err,res){
	            res.status.should.equal(tc[i][2]);
	            if (tc[i][2]==200)
	            	testcases.profile.push(res.body.uid);
	            done();
	            if (i == tc.length - 1){
	            	callback();
	            }
	        });
	    });
	}


	login_test.run = function(callback){
		for (var i=0; i < tc.length; i++){
			if (i!=3){
				let hash = sha256(tc[i][1]);
	            tc[i][1] = hash;
        	}
			this.test(i,callback);
		}
	}

	return login_test;

}