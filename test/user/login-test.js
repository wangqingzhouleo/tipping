`use strict`
const sha256 = require('sha256');
let testcases = require('./testCases.js').testcases;


module.exports = function(server,should){
	let login_test = {};
	let tc = testcases.login;
	login_test.test = function(i){
		let _this = this;
	    it("login test case" + i,function(done){
	        server
	        .post("/login")
	        .send({"loginInditify":tc[i][0],"password":tc[i][1]})
	        .end(function(err,res){
	            res.status.should.equal(tc[i][2]);
            	done();	            
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