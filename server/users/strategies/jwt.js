`use strict`

const passport = require("passport");
import {jwtOptions} from '~/configure';






module.exports = function () {
	passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, next) {
		console.log('payload received', jwt_payload);
		// usually this would be a database call:
		var user = users[_.findIndex(users, {id: jwt_payload.id})];
		if (user) {
		next(null, user);
		} else {
		next(null, false);
		}
	}));
}
