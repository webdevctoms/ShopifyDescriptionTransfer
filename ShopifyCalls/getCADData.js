require('dotenv').config();
const request = require('request');
const {URLCAD,USERK,USERP} = require("../config");

//callback to return data in original function,callback passed in original file calling it
//have to nest the function inorder to pass callback
function StartCallCAD(){
	var promise = new Promise((resolve,reject) => {
		const authKey = Buffer.from(USERK + ":" + USERP).toString('base64');
		const options = {
			url:URLCAD + "products.json",
			headers:{
				"Authorization":"Basic " + authKey
			}
		}
		//callback("test");
		//need to grab the body_html and id of each then return that to the callback for use
		request(options,function(error,response,body){
			const parsedBody = JSON.parse(body);

			console.log("parsedBody");
			resolve(parsedBody);
			//return callback("it worked");
		});
	});
	
	return promise;
}

module.exports = {StartCallCAD};