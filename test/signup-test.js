const sha256 = require('sha256');

var tc = [
	["fa93hws","wjun0912@gmail.com","546",0],
	["fa93hws","wjun0912@126.com","134",1], // 1
	["wjun0912","wjun0912@gmail.com","2435",1],
	["1","c@c.com","23",0], //3
	["fa93hws","wjun0912","41223",3],
	["","wjun0912@gmail.com","214312",4],//5
	["fa93hws","wjun0912@gmail.com","",1],
	["fa99=0","wjun0912@gmail.com","12",2], // 7
	["fa990","wjun0m;912@gmail.com","12",3],
	["12312321321321321243215sdkjgdsalkfjoizcxuv98xz7908324uijhxzvciusaoidfdsafdsafcxzv","wjun0912@gmail.com","123",5]
]


module.exports = function(server,should){
	signup_test = {};
	signup_test.test = function(i){	
	    it("sign-up test case" + i,function(done){
	        server
	        .post("/signup")
	        .send({"username":tc[i][0],"email":tc[i][1],"pwd":tc[i][2]})
	        .end(function(err,res){
	            res.body.code.should.equal(tc[i][3]);
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