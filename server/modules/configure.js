`use strict`

const sqlPara={"host":"localhost", "user":"root", "password":"0535259", "database":"tipping"};
const webPara={"port":3000};

const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwtOptions = {"jwtFromRequest":ExtractJwt.fromAuthHeader(), "secretOrKey":"2328"};
const mailSetting = {
	'service' : 'gmail',
	'account' : 'naamtech.intern.group.1@gmail.com',
	'password': 'abc!@#123'
}


export {sqlPara, webPara,jwtOptions,mailSetting};