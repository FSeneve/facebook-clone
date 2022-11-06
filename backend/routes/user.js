const express = require("express")
const router = express.Router()
const {home} = require('../controllers/user')
const {register, activateAccount, login} = require('../controllers/user')

router.get('/',home);
router.post('/register', register);
router.post('/activate', activateAccount);
router.post('/login', login);


module.exports = router;