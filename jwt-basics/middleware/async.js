// to save time while programming the controllers
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            fn(req, res, next);
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = asyncWrapper;