const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image:{
        url: String,
        fileName: String,
    },
    price: Number,
    location: String,
    // country: String,
    state: String,
    count:{

        type: Number, //Number of people visited
        default: 0,
    },
    visits: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        } 
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
    
}); //This Middleware is triggered when we Delete a Review in Delete Review Route(app.delete()) in app.js specifically when we call findByIdAndDelete();


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;