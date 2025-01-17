const {createListing, deleteListing, updateListing, getListing, getListings}  = require('../controllers/Listingcontroller.js');
const VerifyToken = require('../middleware/VerifyToken.js');


const express = require('express');

const router = express.Router()

router.post('/create', VerifyToken, createListing);
router.delete('/delete/:id', VerifyToken, deleteListing);
router.post('/update/:id', VerifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);


module.exports = router;