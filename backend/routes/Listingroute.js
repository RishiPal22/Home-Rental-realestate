const createListing  = require('../controllers/Listingcontroller.js');
const VerifyToken = require('../middleware/VerifyToken.js');


const express = require('express');

const router = express.Router()

router.post('/create', VerifyToken, createListing);

module.exports = router;