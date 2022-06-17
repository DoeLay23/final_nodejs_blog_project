const router = require('express-promise-router')();
const controller = require('../controllers/user');

router.post('/register',controller.register('user'));
router.post('/login',controller.login);

module.exports =router;