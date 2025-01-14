const {createListing, deleteListing, updateListing, getListing}  = require('../controllers/Listingcontroller.js');
const VerifyToken = require('../middleware/VerifyToken.js');


const express = require('express');

const router = express.Router()

router.post('/create', VerifyToken, createListing);
router.delete('/delete/:id', VerifyToken, deleteListing);
router.post('/update/:id', VerifyToken, updateListing);
router.get('/get/:id', getListing);

module.exports = router;