`use strict`

var testcases = {
	signup:[
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
	"uppro":[
		{"sex":"M", "imageurl":"http://i4.piimg.com/5596/54a90ad59ac489e2.jpg",
			"birthday":"1989-09-12","phone":"0451122306","location":"NSW",
			"displayname":"eric","expect":200},
		{"sex":"P", "imageurl":"http://i4.piimg.com/5596/54a90ad59ac489e2.jpg",
			"birthday":"1989-09-12","phone":"0451122306","location":"NSW",
			"displayname":"eric","expect":400}, //invalid sex 1
		{"sex":"M", "imageurl":"http://i4.piimg.com/5596/54a90ad59ac489e2.jpg",
			"birthday":"1900-02-29","phone":"0451122306","location":"NSW",
			"displayname":"eric","expect":400}, //invalid birthday
		{"sex":"M", "imageurl":"http://i4.piimg.com/5596/54a90ad59ac489e2.jpg",
			"birthday":"19829-02-29","phone":"0451122306","location":"NSW",
			"displayname":"eric","expect":400}, //invalid birthday 3
		{"sex":"M", "imageurl":"http://i4.piimg.com/5596/54a90ad59ac489e2.jpg",
			"birthday":"2015-09-31","phone":"0451122306","location":"NSW",
			"displayname":"eric","expect":400}, //invalid birthday
		{"sex":"M", "imageurl":"http://i4.piimg.com/5596/54a90ad59ac489e2.jpg",
			"birthday":"2016-02-29","phone":"0451122306","location":"NSW",
			"displayname":"eric","expect":200}, //invalid birthday 5
	],
	"forget":[
		["wjun0912@gmail.com",200],
		["wjun09112@gmail.com",400],
		["123af",400]
	]
}

exports.testcases = testcases;
