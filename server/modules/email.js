`use strict`
import mailSetting from '~/configure';

class Email{
	constructor(){
		this.mailConfig = mailSetting;
	}
}

export default Email;