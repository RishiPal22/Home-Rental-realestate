const express = require('express');
const {test,updateUser, deleteUser, getUserListings}  = require('../controllers/Usercontroller.js');
const  VerifyToken  = require('../middleware/VerifyToken.js');
const router = express.Router()

router.get('/test', test);
router.post('/update/:id', VerifyToken, updateUser);
router.delete('/delete/:id', VerifyToken, deleteUser);
router.get('/listings/:id', VerifyToken, getUserListings);

module.exports = router;