const { getAllVendors, getVendor, registerVendor, deleteVendor, updateVendor } = require('../controllers/vendors_controller')

const router = require('express').Router()

router.get('/',getAllVendors)
router.get('/:id',getVendor)
router.post('/registerVendor/:uid',registerVendor)
router.delete('/:id',deleteVendor)
router.put('/:id',updateVendor)


module.exports = router 