
const errorHandler = async (err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const errorTitles = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        500: "Internal Server Error",
        503: "Service Unavailable",
    };
    const getTitle =  errorTitles[statusCode] || "Undefined Error";
    console.log(err.message);
    res.json({
        title : getTitle,
        Status_Code : statusCode,
        Error_Message : err.message,
        StackTrace : err.stack
    })
}
module.exports = errorHandler;