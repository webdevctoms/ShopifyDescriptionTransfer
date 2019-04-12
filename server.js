require('dotenv').config();
const express = require('express');
const {PORT} = require('./config');
const app = express();

let server;

function runServer(port = PORT){

	return new Promise((resolve,reject) => {
		server = app.listen(port, () => {
			console.log('listening on port ',port)
			let num1 = 5;
			let num2 = 6;
			let sum = 5 + 6;
			resolve(sum);
			
		})
		
		.on('error',err => {
			reject(err);
		})
	})
	.then(sum => {
		console.log("then the sum is ",sum);
		sum += 1;
		return sum;
	})
	.then(sum => {
		console.log("new sum ",sum);
	});
}

function closeServer(){
	return new Promise((resolve,reject) => {
		console.log("closing server");
		server.close(err => {
			if(err){
				return reject(err);
			}
			resolve();
		});
	});
}

if (require.main === module){
	runServer().catch(err => console.log(err));
}

module.exports = { app, runServer, closeServer };