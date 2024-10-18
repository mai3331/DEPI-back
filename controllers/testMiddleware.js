const jwt = require('jsonwebtoken');

const testMiddleware = async (req, res, next) => {
    console.log("From test middleware");
    console.log(req);
    next();
};

module.exports = testMiddleware;