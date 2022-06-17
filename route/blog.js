const router = require('express-promise-router')();
const controller= require('../controllers/blog');
const { photoUpload } = require('../util/gallery');
const { validateToken, validateRole } = require('../util/validator');

router.get('/',controller.all);
router.post('/create',[validateToken,validateRole('admin'),photoUpload],controller.create);
router.patch('/:id',[validateToken,validateRole('admin')],controller.update);
router.delete('/:id',[validateToken],controller.remove);
module.exports = router;