const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();

exports.jwtSign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3d" });
}


exports.verifyUser = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        res.status(200).json({
            status: false,
            result: "You are not authenticated"
        });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) res.status(200).json({ status: false, result: "Token is valid" });
        req.user = user;
        next();
    });
}

