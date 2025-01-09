const Errorhandler = require("../middleware/Error.js");
const bcrypt = require("bcrypt");
const User = require("../models/Usermodel.js");
const Listing = require("../models/Listingmodel.js");

const test = (req, res) => {
    res.send("This is a user route and controller")
};

const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(Errorhandler(401, "You should only update your own account"))
    }
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
};

const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(Errorhandler(401, "You should only delete your own account"))
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("User has been deleted");

    } catch (error) {
        next(error)
    }
}

const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id})
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    }
    else {
        return next(Errorhandler(401, "You should only view your own listings"))
    }
}

module.exports = { test, updateUser, deleteUser, getUserListings };

