const sha256 = require('sha256');

var tc = [
	["fa93hws","546",0],
	["wjun0912@gmail.com","546",0],
	["fa93h=ws","546",2], // invalid char
]


module.exports = function(server,should){
	signup_test = {};
	signup_test.test = function(i){	
	    it("login test case" + i,function(done){
	        server
	        .post("/login")
	        .send({"user":tc[i][0],"pwd":tc[i][1]})
	        .end(function(err,res){
	            res.body.code.should.equal(tc[i][2]);
	            done();
	        });
	    });		
	}


	signup_test.run = function(){
		for (var i=0; i < tc.length; i++){
			let hash = sha256(tc[i][2]);
            tc[i][2] = hash;
			this.test(i);
		}
	}

	return signup_test;

}