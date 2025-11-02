const express = require("express");
const router = express.Router({mergeParams : true}); //mergeParams is used to merge the :id parameter value between the routes with the routes
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");


//Cotrollers for Review Routes
const reviewController = require("../controllers/reviews.js");




//Post Review Route
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);


//Delete Review Route
router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);


module.exports = router;