const sha256 = require('sha256');

module.exports = function(server,should){
	let signup_test = {};
	let tc = testcases.signup;
	
	signup_test.test = function(i){	
	    it("sign-up test case" + i,function(done){
	        server
	        .post("/signup")
	        .send({"username":tc[i][0],"email":tc[i][1],"password":tc[i][2]})
	        .end(function(err,res){
	            res.status.should.equal(tc[i][3]);
	            done();
	        });
	    });		
	}


	signup_test.run = function(){
		// let tc = testcases.signup;
		for (var i=0; i < tc.length; i++){
			if (i!=6){
				let hash = sha256(tc[i][2]);
	            tc[i][2] = hash;
            }
			this.test(i);
		}
	}

	return signup_test;

}