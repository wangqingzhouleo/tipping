`use strict`

module.exports = {

	getSqlPara:function(){
		let host="localhost";
		let port="3306";
		let user="root";
		let pswd="0535259";
		let db="tipping";

		return {"host":host,"port":port,"user":user,"pswd":pswd,"db":db};
	},

	getWebPara:function(){
		let port="3000";

		return {"port":port};
	}
}