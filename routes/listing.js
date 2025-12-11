const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js"); //cloud storsge for storing photos in cloudinary
const upload = multer({ storage });


//controllers
const listingController = require("../controllers/listings.js");



//Using Router.route
router
    .route("/")
    .get(wrapAsync(listingController.index)) //Index Route
    .post(
        isLoggedIn, 
        validateListing,
        upload.single('listing[image]'), 
        wrapAsync(listingController.createListing)
    ) //Create Route

    



//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/about")
.get((req, res) => {
    // res.send("About Page");
    res.render("listings/about.ejs");
});


router.route("/:id")
    .get(wrapAsync(listingController.showListing)) //Show Route
    .put(isLoggedIn, 
        isOwner, 
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing)) //Update Route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)) //Delete Route


//Index Route
// router.get("/", wrapAsync(listingController.index));


router.route("/:id/visited")
    .post(
        async (req, res) => {
            // console.log("\n",req.body.listing);
            console.log("\n",req.user._id); //current user
            let currUser = req.user._id; //current user
            // console.log("\n",`listings/${req.path}`);
            const previousUrl = req.get('Referer'); //Stores the previous url to redirect to after clicking the button i visited
            // console.log(previousUrl);

            // let Listing = Listing.

            // let updateData = {
            //     count: count + 1,
            // }
            let { id } = req.params; //Curent Listing id
            console.log(id);
            listing = await Listing.findById(id);

             // If the user has already visited, you might skip counting again
            if (listing.visits.includes(currUser)) {
                req.flash("success","You have Already Visited");
                // return res.send("Already visited");
                return res.redirect(previousUrl);
            }

            // Add user to visits array and increment count atomically
            await Listing.findByIdAndUpdate(
            id,
            {
                $push: { visits: currUser }, // Add user to visits array
                $inc: { count: 1 },          // Increment count by 1
            },
            { new: true }
            ); 

            // listing.visits.push(currUser);
            // // console.log("Listing:\n", listing);
            // console.log("Count: ",listing.count);
            // updatedCount = listing.count + 1;

            // await Listing.findByIdAndUpdate(id, {count: updatedCount});

            
            // res.send("Hello");
            // req.flash("success","Congratulations on visiting the Place");
            res.redirect(previousUrl);
        }
    );





//Show Route
// router.get("/:id", wrapAsync(listingController.showListing));


//Create Route
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing)
// );


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)
);

//Update Route
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)
// );

//Delete Route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)
// );


module.exports = router;