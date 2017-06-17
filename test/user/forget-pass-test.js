`use strict`
const testcases = require('./testCases').testcases;
import {jwtOptions} from '~/configure.js';
const jwt = require('jsonwebtoken');
import JwtDecode from '~/JWTDecode'

module.exports = function(server,should){
	var pass_test = {};
	const forget = testcases.forget

	pass_test.run = function(){
		let url = "";
		describe("forget password",function(){
			let index = -1;
			let token = "";
			let email = "";

			beforeEach(function(done){
				index ++;
				email = forget[index][0];
				token = jwt.sign({email:email},jwtOptions.secretOrKey);
				try{
					server.post('/forget').send({token:token})
					.end(function(err,res){
						res.status.should.equal(forget[index][1]);
						if (forget[index][1] == 200)
							url = res.body.url;
						else
							url = "some-random-text";
						// console.log(url);
						done();
					})
				}
				catch(e){
					console.log(e.message);
				}
			})

			for (let i=0; i < forget.length; i++){
				it ("case" + i, function(done){
					server.get('/reset-password').send({token:url})
					.end(function(err,res){
						if (url == "some-random-text")
							res.status.should.equal(404);
						else
							res.status.should.equal(200);
						done();
					})
				})
			}
		});
	}

	return pass_test
}