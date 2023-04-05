//universal middleware to handle error
const errorMiddleware = (err,req,res,next) => {

    err.code = err.code || 500;
    err.message = err.message || "Internal Server Error";

    res.status(err.code).json({
        success:false,
        message: err.message,
    });
};

module.exports = errorMiddleware;
