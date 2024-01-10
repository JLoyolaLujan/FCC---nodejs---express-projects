// if user enters a route that doesn't exists
const notFound = (req, res) => {
    return res.status(404).send("route does not exist");
}

module.exports = notFound;