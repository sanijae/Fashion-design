const { getAllUsers, getUser, registerUser, deleteUser, updateUser, authUser } = require('../controllers/users_controller')

const router = require('express').Router()

router.get('/',getAllUsers)
router.get('/:id',getUser)
router.post('/registerUser',registerUser)
router.post('/loginUser',authUser)
router.delete('/:id',deleteUser)
router.put('/:uid',updateUser)


module.exports = router