var express = require('express');
var USERC = require('../controller/user');
var router = express.Router();


router.post('/signup', USERC.userSignup);

router.post('/login', USERC.userLogin);

router.get('/', USERC.Sequre, USERC.userAllData);





module.exports = router;
