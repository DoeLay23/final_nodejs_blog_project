const router= require('express-promise-router')();
const userController = require('../controllers/user');
const { validateToken, validateRole } = require('../util/validator');

router.post('/register',[validateToken,validateRole('owner')],userController.register('admin'));
module.exports = router;