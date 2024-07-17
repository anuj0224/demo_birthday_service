const Router  = require('express');
const getUsers = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);
// router.post('/', createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

module.exports = router;
