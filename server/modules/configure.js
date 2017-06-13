`use strict`

const sqlPara={"host":"localhost", "user":"root", "password":"0535259", "database":"tipping"};
const webPara={"port":3000};

const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwtOptions = {"jwtFromRequest":ExtractJwt.fromAuthHeader(), "secretOrKey":"2328"};

export {sqlPara, webPara,jwtOptions};