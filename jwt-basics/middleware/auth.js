// authentication middleware

// import jwt 
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    // I get the authorization token from the header
    const authHeader = req.headers.authorization;

    // check if it doesn't exist or if it doesn't start with "Bearer "
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token provided" });
    }

    // I extract the token from the script
    const token = authHeader.split(" ")[1];

    // then I verify
    try {
        // verify token - I need the token and the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // I can get the id and username used to make the token from here
        const { id, username } = decoded;
        req.user = { id, username };
        next(); // the next middleware is "dashboard"
    } catch (error) {
        res.status(401).json({ msg: "not authorized to access this route" });
    }
    // console.log(req.headers.authorization); 
}

module.exports = authMiddleware;