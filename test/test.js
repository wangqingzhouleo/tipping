const supertest = require("supertest");
const server = supertest.agent("http://localhost:3000");
const should = require("should");
const signUp = require("./user/signup-test.js")(server,should);
const login  = require("./user/login-test.js")(server,should);
const getpro = require("./user/getprofile-test.js")(server,should);
const uppro = require("./user/updateprofile-test.js")(server,should);
const forget = require("./user/forget-pass-test.js")(server,should);





describe("sign-in and up",function(){
    it("clear the table",function(done){
        server
        .post("/clearall")
        .send({})
        .end(function(err,res){
            done();
        });
    });
    signUp.run();
    login.run();
})
getpro.run();
uppro.run();
forget.run()