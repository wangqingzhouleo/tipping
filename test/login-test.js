const sha256 = require('sha256');

var tc = [
	["fa93hws","546",0],
	["wjun0912@gmail.com","546",0], // 1
	["fa93h=ws","546",1], // invalid char
	["safd","",2],//3 not hashed
	["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","2",3],
	["fa93hws","123",4]
]


module.exports = function(server,should){
	login_test = {};
	login_test.test = function(i){	
	    it("login test case" + i,function(done){
	        server
	        .post("/login")
	        .send({"loginInditify":tc[i][0],"pwd":tc[i][1]})
	        .end(function(err,res){
	            res.body.code.should.equal(tc[i][2]);
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