const jwt = require('jsonwebtoken');
import {jwtOptions} from '~/configure';

class JWTDecode{
	constructor(){
		this.secret = jwtOptions.secretOrKey;
	}
	extractPayload(token){
		return jwt.decode(token,this.secret);
	}
}

export default JWTDecode;