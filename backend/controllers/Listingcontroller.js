const Errorhandler = require("../middleware/Error");
const Listing = require("../models/Listingmodel");

const createListing = async (req, res, next) => {

    try{
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
    }catch(error){
        next(error)
        console.log(error);
    }

};

const deleteListing = async (req, res, next) => { 
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        res.status(404).json({message: "Listing not found"});
    }

    if(req.user.id !== listing.userRef.toString()){
        return next(Errorhandler(401, 'You can only delete your own listings!'));
    }
    try{
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json( "Listing deleted");

    }catch(error){
        next(error);
        console.log(error);
    }
 }

module.exports = {createListing, deleteListing};