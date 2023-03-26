const BigPromise = require("../middlewares/bigPromise");

exports.home = BigPromise((req,res) => {
    res.status(200).json({
        success: true,
        greeting: "Hello from API",
    });
});

exports.dummy = BigPromise((req,res) => {
    res.status(200).json({
        success: true,
        greeting: "Hello from Dummy Home",
    });
});
