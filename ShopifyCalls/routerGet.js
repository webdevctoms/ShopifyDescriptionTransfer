const express = require("express");
const router = express.Router();
const {StartCallCAD} = require('../ShopifyCalls/getCADData');

router.get("/",(req,res) => {
	let num1 = 5;
	let num2 = 1;
	let sum = num1 + num2;
	console.log("first sum ",sum);
	return StartCallCAD()

	.then(data => {
		sum += 1;
		console.log("second sum ",sum);
		return StartCallCAD()
	})

	.then(data => {
		console.log("get data: ");
		sum += 1;
		console.log("final sum ",sum);
		res.status(201).json({data:"yup"});
	})
});

module.exports = {router};