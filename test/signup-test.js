const sha256 = require('sha256');

var tc = [
	["fa93hws","wjun0912@gmail.com","546",200],
	["fa93hws","wjun0912@126.com","134",400], // 1
	["wjun0912","wjun0912@gmail.com","2435",400],
	["1","c@c.com","23",200], //3
	["fa93hws","wjun0912","41223",400],
	["","wjun0912@gmail.com","214312",400],//5
	["fa93hws","wjun0912@gmail.com","",400], // password not hashed
	["fa99=0","wjun0912@gmail.com","12",400], // 7
	["fa990","wjun0m;912@gmail.com","12",400],
	["12312321321321321243215sdkjgdsalkfjoizcxuv98xz7908324uijhxzvciusaoidfdsafdsafcxzv","wjun0912@gmail.com","123",400]
]


module.exports = function(server,should){
	signup_test = {};
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