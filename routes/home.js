const express = require('express')
const router = express.Router()

const {home,dummy} = require("../controllers/homeController");

router.route('/').get(home);
router.route('/dummy').get(dummy)

module.exports = router;