const jwt = require("jsonwebtoken");
const secretKey = "superS3cr3t1";

const authenticateJwt = (req, res, next) => {
    const authHead = req.headers.authorization;
    if (authHead) {
        const token = authHead.split(" ")[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Un-Authorized" });
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.status(403).json({ message: "Forbidden" });
    }
};

//check if admin middlware  
const checkAdminAccess = (req, res, next) => {
    if (req.user.adminid) {
        next();
    } else {
        res.status(403).json({ message: "Forbidden - Admin access required" });
    }
};

module.exports = {
    authenticateJwt,
    secretKey,
    checkAdminAccess
}