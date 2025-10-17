const jwt = require("jsonwebtoken");

require('dotenv').config();

// Token Creation
module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, process.env.AUTH_SECRET_KEY);
};

// Token Verification
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if (!token) {
		return res.status(403).json({ auth: "Failed. No Token"});
	}

	token = token.replace("Bearer ", "");

	jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, decodedToken) => {
		if (err) {
			return res.status(403).json({ auth: "Failed", message: err.message });
		}

		req.user = decodedToken;
		next();
	});
};

// Verify Admin
module.exports.verifyAdmin = (req, res, next) => {

	if(req.user.isAdmin){
		next();
	} else {

		return res.status(403).send({
			auth: "Failed",
			message: "Action Forbidden"
		});
	};
};

module.exports.errorHandler = (err, req, res, next) => {

	console.error(err);

	const statusCode = err.status || 500;
	const errorMessage = err.message || 'Internal Serverr Error';

	res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER_ERROR',
			details: err.details || null
		}
	});
};




