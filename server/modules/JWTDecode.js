const jwt = require('jsonwebtoken');
import {jwtOptions} from '~/configure';

class JWTDecode{
	constructor(){
		this.secret = jwtOptions.secretOrKey;
	}
	validToken(token){
		if (typeof token == 'undeifined')
			return false;
		return true;
	}
	extractPayload(token){
		if (!this.validToken(token)){
			return false;
		}
		return jwt.decode(token,this.secret);
	}
}

export default JWTDecode;