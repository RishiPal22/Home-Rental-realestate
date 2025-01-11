const {createListing, deleteListing, updateListing}  = require('../controllers/Listingcontroller.js');
const VerifyToken = require('../middleware/VerifyToken.js');


const express = require('express');

const router = express.Router()

router.post('/create', VerifyToken, createListing);
router.delete('/delete/:id', VerifyToken, deleteListing);
router.post('/update/:id', VerifyToken, updateListing);

module.exports = router;