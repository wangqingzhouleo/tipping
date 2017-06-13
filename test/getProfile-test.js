`use strict`

const sha256 = require('sha256');

module.exports = function(server,should){	
	let getProfile_test = {};
	let tc = testcases.profile;
	getProfile_test.test = function(i){	
	    it("login test case" + i,function(done){
	        server
	        .post("/profile")
	        .send({"uid":tc[i]})
	        .end(function(err,res){
	        	console.log(res);
            	if (tc[i] >0)
            		res.body.roles.should.equal(0);
            	else{
            		let t = ((typeof res.body.sex) == 'undefined');
            		t.should.equal(true);
            	}
	            done();
	        });
	    });
	}


	getProfile_test.run = function(){

		for (var i=0; i < tc.length; i++){

			this.test(i);
		}
	}

	return getProfile_test;

}