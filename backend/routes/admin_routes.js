const { getAllAdmins, getAdmin, registerAdmin, deleteAdmin, updateAdmin, authAdmin } = require('../controllers/admin_controller')

const router = require('express').Router()

router.get('/',getAllAdmins)
router.get('/:id',getAdmin)
router.post('/registerAdmin/:uid',registerAdmin)
router.post('/loginAdmin/:uid',authAdmin)
router.delete('/:id',deleteAdmin)
router.put('/:id',updateAdmin)


module.exports = router