const {CKEY} = require('../config');

let checkKey = function(req,res,next){
	//console.log(req.query.ckey);
	if(req.query.ckey !== CKEY){
		return res.status(422).json({
			code:422,
			message:"unathorized"
		});
	}
	else{
		next();
	}
}

module.exports = {checkKey};