const Post = require('../databases/post_model') 
const User = require('../databases/users_model') 
const Order = require('../databases/ordersmodel') 

exports.getAllOrders =async(req,res)=>{
    try {
        const order = await Order.find().lean()
        res.json({result:order})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOrder =async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).lean()
        res.json({result:order})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.createOrder =async(req,res)=>{
    try {
        const post = await Post.findById(req.params.uid)
        const order = await Order.create({...req.body,post:post,user:req.body.user})
        await User.findByIdAndUpdate(req.params.uid,{order:order._id},{new:true})
        res.json({result:order})        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteOrder =async(req,res)=>{
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        res.json({result:order})       
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.updateOrder =async(req,res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,{...req.body},{new: true})
        res.json({result:order})       
    } catch (error) {
        res.json({error:error.message})
    }
}