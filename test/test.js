const supertest = require("supertest");
global.testcases = require('./user/testCases').testcases;
// This agent refers to PORT where program is runninng.

const server = supertest.agent("http://localhost:3000");
const should = require("should");
const signUp = require("./user/signup-test.js")(server,should);
const login  = require("./user/login-test.js")(server,should);
const getpro = require("./user/getprofile-test.js")(server,should);
const uppro = require("./user/updateprofile-test.js")(server,should);

describe("unit test",function(){
    // it("clear the table",function(done){
    //     server
    //     .post("/clearall")
    //     .send({})
    //     .end(function(err,res){
    //         done();
    //     });
    // });
    // signUp.run();
    // login.run();
    // getpro.run();
    uppro.run();
    
});	