const express = require('express');
const router = express.Router();
const userapp = require('../../controllers/login/app');


router.post('/create', userapp.createapp);
router.post('/update', userapp.updateapp);
router.post('/read', userapp.readapp);

module.exports = router;