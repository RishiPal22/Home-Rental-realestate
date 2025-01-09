const {createListing, deleteListing}  = require('../controllers/Listingcontroller.js');
const VerifyToken = require('../middleware/VerifyToken.js');


const express = require('express');

const router = express.Router()

router.post('/create', VerifyToken, createListing);
router.delete('/delete/:id', VerifyToken, deleteListing);

module.exports = router;