var express = require('express');
var router = express.Router();
const list = require("../controllers/user.controller.js")

/* GET users listing. */
router.get('/',list.getUsers);



module.exports = router;
