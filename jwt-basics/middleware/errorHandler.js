// middleware that handles errors (server-side errors)
const errorHandler = (err, req, res, next) => {
    console.log(err); 
    return res.status(500).json({ message: "something went wrong, sorry!" });
}

module.exports = errorHandler;