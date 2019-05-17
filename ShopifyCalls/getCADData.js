require('dotenv').config();
const request = require('request');
const {URLCAD,USERK,USERP} = require("../config");

//callback to return data in original function,callback passed in original file calling it
//have to nest the function inorder to pass callback
//function will call itself resolving each of its own promises sequentially
//it will add data to the starting array after each request and resolve that data
//until it reaches a empty 
//finally it will resolve the original router promise with the final array 
function StartCallCAD(dataArray,lastId){
	if(dataArray === undefined){
		dataArray = [];
	}

	var promise = new Promise((resolve,reject) => {
		let newUrl = URLCAD + "products.json?" + "limit=250&fields=id,body_html,title,variants"
		if(lastId !== undefined){
			newUrl += "&since_id=" + lastId;
		}
		const authKey = Buffer.from(USERK + ":" + USERP).toString('base64');
		const options = {
			url:newUrl,
			headers:{
				"Authorization":"Basic " + authKey
			}
		}
		//need to grab the body_html and id of each then return that to the callback for use
		request(options,function(error,response,body){
			const parsedBody = JSON.parse(body);
			console.log("products data length: ",parsedBody.products.length);
			if(parsedBody.products.length !== 0){
				let newData = [];
				for(let i = 0;i < parsedBody.products.length;i++){
					let currentProduct = parsedBody.products[i];
					let currentObject = {};
					currentObject.id = currentProduct.id
					currentObject.body_html = currentProduct.body_html
					currentObject.title = currentProduct.title

					if(currentProduct.variants.length > 0){
						currentObject.sku = currentProduct.variants[0].sku;
					}
					newData.push(currentObject);
				}
				dataArray.push(newData);
				let lastId = parsedBody.products[parsedBody.products.length - 1].id;
				resolve(StartCallCAD(dataArray,lastId));
			}
			else{
				resolve(dataArray);
			}
		});
	});
	
	return promise;
}

module.exports = {StartCallCAD};