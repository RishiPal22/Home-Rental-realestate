const Errorhandler = require("../middleware/Error");
const Listing = require("../models/Listingmodel");

const createListing = async (req, res, next) => {

    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        next(error)
        console.log(error);
    }

};

const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        res.status(404).json({ message: "Listing not found" });
    }

    if (req.user.id !== listing.userRef.toString()) {
        return next(Errorhandler(401, 'You can only delete your own listings!'));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing deleted");

    } catch (error) {
        next(error);
        console.log(error);
    }
}

const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(Errorhandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef.toString()) {
        return next(Errorhandler(401, 'You can only update your own listings!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedListing)

    } catch (error) {
        next(error);
        console.log(error);
    }
}

const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(Errorhandler(404, "Listing not found"));
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
        console.log(error)
    }

}

const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer
        if (offer === undefined || offer === "False") {
            offer = { $in: [true, false] }
        }

        let furnished = req.query.furnished
        if (furnished === undefined || furnished === "False") {
            furnished = { $in: [true, false] }
        }

        let parking = req.query.parking
        if (parking === undefined || parking === "False") {
            parking = { $in: [true, false] }
        }

        let type = req.query.type
        if (type === undefined || type === "all") {
            type = { $in: ['sale', 'rent'] }
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
        }).sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex)

        return res.status(201).json(listings)

    } catch (error) {
        next(error)
    }
}

module.exports = { createListing, deleteListing, updateListing, getListing, getListings };