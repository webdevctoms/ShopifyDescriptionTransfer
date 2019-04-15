const express = require("express");
const router = express.Router();
const {StartCallCAD} = require('../ShopifyCalls/getCADData');
const fs = require('fs');

router.get("/CAD",(req,res) => {
	let num1 = 5;
	let num2 = 1;
	let sum = num1 + num2;
	console.log("first sum ",sum);
	return StartCallCAD()

	//will need function to check the data with current data to not add duplicates
	.then(data => {

		return new Promise((resolve,reject) => {
			let testObj = {
				products:[
					{
						title:"test1",
						body_html:'<p class="test">test 1</p>'
					},
					{
						title:"test2",
						body_html:'<p class="test2">test 2</p>'
					}
				]
			};
			let stringData = JSON.stringify(testObj);
			fs.writeFile('../data/testData.json',stringData,'utf-8',function(err,data){
				if(err){
					reject(err);
				}
				else{
					console.log("writing file");
					resolve(testObj.products.length);
				}
				
			});
			
		})
	})

	.then(data => {
		console.log("get data: ",data);

		//can wrap this in promise if need to do something after
		fs.readFile('./data/testData.json','utf-8',function(err,data){
			if(err){
				console.log("error reading file: ",err)
				res.status(500).json({data:"err writing file"});
			}else{
				let obj = JSON.parse(data);
				obj.products.push({
					title:"test3",
					body_html:"yup"
				});
				console.log("new data: ",obj.products[2]);
				res.status(201).json({data:"yup"});
			}

			
		});
		
	})

	.catch(err => {
		console.log(err);
		res.status(500).json({data:err});
	})
});

module.exports = {router};