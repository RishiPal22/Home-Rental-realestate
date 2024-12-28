const express = require('express');
const {test,updateUser}  = require('../controllers/Usercontroller.js');
const  VerifyToken  = require('../middleware/VerifyToken.js');
const router = express.Router()

router.get('/test', test);
router.post('/update/:id', VerifyToken, updateUser);

module.exports = router;