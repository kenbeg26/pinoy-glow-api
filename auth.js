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



