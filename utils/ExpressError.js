class ExpressError extends Error{
    constructor(statusCode, message){
        console.log("Constructor Called");
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;