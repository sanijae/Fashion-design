const { getAllOrders, getOrder, createOrder, deleteOrder, updateOrder } = require('../controllers/orders_controller')

const router = require('express').Router()

router.get('/',getAllOrders)
router.get('/:id',getOrder)
router.post('/createNewOrder/:id',createOrder)
router.delete('/:id',deleteOrder)
router.put('/:id',updateOrder)


module.exports = router