const sha256 = require('sha256');

var tc = [
	["fa93hws","546",200],
	["wjun0912@gmail.com","546",200], // 1
	["fa93h=ws","546",400], // invalid char
	["safd","",400],//3 not hashed
	["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","2",400],
	["fa93hws","123",400]//5
]


module.exports = function(server,should){
	login_test = {};
	login_test.test = function(i){	
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