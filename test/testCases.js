`use strict`

var testcases = {
	"signup":[
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
	],
	"login": [
		["fa93hws","546",200],
		["wjun0912@gmail.com","546",200], // 1
		["fa93h=ws","546",401], // invalid char
		["safd","",401],//3 not hashed
		["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","2",401],
		["fa93hws","123",401]//5
	],
	"profile":[1]
}

exports.testcases = testcases;
