const express = require('express');
const {signin,signup, google, usersignOut} = require('../controllers/Authcontroller');

const router = express.Router()

router.post('/signup',signup)
router.post('/signin', signin)
router.post('/google', google)
router.get('/signout', usersignOut)

module.exports = router;