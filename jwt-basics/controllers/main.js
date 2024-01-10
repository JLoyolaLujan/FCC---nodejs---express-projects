// import jwt
const jwt = require("jsonwebtoken");
// import wrapper 
const asyncWrapper = require("../middleware/async");

// instead of checking with joi or mongo, we'll do it in the controllers
const login = asyncWrapper( async (req, res) => {
    const { username, password } = req.body; 

    // demo id, not from the req
    const id = new Date().getDate();

    if(!username || !password) {
        return res.status(400).send({err: "invalid username or password"})
    } 

    // create token (try to keep payload small)
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: "30d"});
    console.log(username, password); 
    res.status(200).json({msg: "user created", token});
});

const dashboard = asyncWrapper( async (req, res) => {
    // since up to this point the object "user" has been added to the req object as property
    // and since the "user" object has the properties id and username
    console.log(req.user); // to check
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({msg:`hello, ${req.user.username}`, secret: `here is your lucky number: ${luckyNumber}`});
});

module.exports = {
    login, 
    dashboard
}