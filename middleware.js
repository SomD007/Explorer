const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require('./schema.js'); // For Server side validation
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
    console.log(req.path,"...",req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create a listing");
        return res.redirect("/login");
    }
    next();
}


//the passport module resets the req.session object whenever the user logins. so the variable "req.session.redirectUrl" stored in req.session is also removed whenever the user logins
//Here we are saving the session variable "req.session.redirectUrl" in res.locals becouse the passport does not have access to res.locals so the value will be stored
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id)){ //Authrization
        req.flash("error","You are not the owner of the listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => { 
    let {error} = listingSchema.validate(req.body); //Server Side validation usin the file schema.js
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.validateReview = (req, res, next) => { 
    let {error} = reviewSchema.validate(req.body); //Server Side validation usin the file schema.js
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if(!review.author.equals(res.locals.currUser._id)){ //Authrization
        req.flash("error","You are not the author of the review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};