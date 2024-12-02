const express = require('express');
const test  = require('../controllers/Usercontroller.js');
const router = express.Router()

router.get('/test', test);

module.exports = router;