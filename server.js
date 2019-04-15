require('dotenv').config();
const express = require('express');
const {PORT} = require('./config');
const {StartCallCAD} = require('./ShopifyCalls/getCADData');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const {router:getDataRouter} = require("./ShopifyCalls/routerGet");
const app = express();
app.use(jsonParser);
app.use("/api",getDataRouter);
let server;

function runServer(port = PORT){

	return new Promise((resolve,reject) => {
		server = app.listen(port, () => {
			console.log('listening on port ',port)
					
		})
		
		.on('error',err => {
			reject(err);
		})
	})
	.catch(err => {
		console.log("error ",err);
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