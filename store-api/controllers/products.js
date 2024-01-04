// async middleware
const asyncWrapper = require("../middleware/async");
// schema/model
const Product = require("../models/products");

const getAllProductsStatic = asyncWrapper( async (req, res) => {
    //const search = "ab";
    const products = await Product.find({price: {$gt: 30}}).sort("name").select("name price").limit(7).skip(6);
    if (products.length == 0) {
        return res.status(404).json({ error: "no products available" });
    }
    res.status(200).json({ products, nbHits: products.length });
})

const getAllProducts = asyncWrapper( async (req, res) => {
    
    const { featured, company, name, sort, fields, numericFilters } = req.query; 
    /*
    if (products.length == 0) {
        return res.status(404).json({ error: "no products found" });
    }
    */
    const queryObject = {}; 

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    // numeric filters
    if(numericFilters) {
        // translate operators to mongoose
        const operators = {
            '>': '$gt', // greater than
            '>=': '$gte', // greater than or equal
            '=': '$eq', // equal
            '<': '$lt', // lesser than
            '<=': '$lte' // lesser than or equal
        }
        // we make a filter list (those symbols we want to replace)
        const regEx = /\b(>|>=|=|<|<=)\b/g; // I gotta re-study regular expressions dear GOD
        // not, if there's a symbol in tje numericFilters variable
        // then it will be replaced by their respective equivalents
        let filters = numericFilters.replace(regEx, (match) => `-${operators[match]}-`);

        // now I set up the options I can apply
        const options = ["price", "rating"];
        // then I split (since up to this point the value returned would be something like price-$gt-30)
        // the first split will give me one or more arrays
        filters = filters.split(",").forEach((item) => {
            // each item will be separated by field, operator and value 
            const [field,operator,value] = item.split("-");
            // if the field is included in the options array
            if (options.includes(field)) {
                // I add it to the queryObject (now the value returned looks like this: { price: { '$gt': 30 } })
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    } // numberFilters works ONLY if I place this before the sort (????) I gotta re-study lots of topics here

    // in order to apply sort we must change the const for a let
    // because we don't know if the user will ask for the results to be sorted
    let result = Product.find(queryObject); 
    
    // to sort
    if (sort) {
        //console.log(sort);
        const sortList = sort.split(",").join(" "); 
        result = result.sort(sortList); // to sort
    }
    else {
        // else sort by date
        result = result.sort("createdAt");
    }

    // filter by field
    if (fields) {
        //console.log(fields);
        const fieldsList = fields.split(",").join(" "); 
        result = result.select(fieldsList);
    }

    // pagination
    const page = Number(req.query.page) || 1; // if user doesn't pass number, then 1
    const limit = Number(req.query.limit) || 10; // limit of results; if not passed, show 10 results
    const skip = (page - 1) * limit; // if page one, skip nothing and show the first ten; if page two,
    // then skip the first ten results and then show the other ten results
    result = result.skip(skip).limit(limit);

    console.log(queryObject);
    const products = await result; // to return results
    res.status(200).json({ products, nbHits: products.length });
})
module.exports = {
    getAllProducts, 
    getAllProductsStatic
}