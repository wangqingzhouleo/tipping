const supertest = require("supertest");
global.testcases = require('./testCases').testcases;
// This agent refers to PORT where program is runninng.

const server = supertest.agent("http://localhost:3000");
const should = require("should");
const signUp = require("./signup-test.js")(server,should);
const login  = require("./login-test.js")(server,should);
const getPro = require("./getProfile-test.js")(server,should);

describe("unit test",function(){
    it("clear the table",function(done){
        server
        .post("/clearall")
        .send({})
        .end(function(err,res){
            done();
        });
    });
    signUp.run();
    login.run(function(){
        console.log(testcases.profile);
        // getPro.run();
    });
    
});	
