`use strict`
import Auth from './controllers/user.auth'

class User{
	constructor(body){
		this.auth = new Auth(body);
	}
	

}

export default User;