const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../databases/users_model')

exports.getAllUsers =async(req,res)=>{
    try {
        const user = await User.find().lean()
        const countUser = await User.countDocuments()
        res.json({countUser,result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.getUser =async(req,res)=>{
    try {
        const user = await User.findById(req.params.id).populate('posts')
        res.json({result:user})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.registerUser =async(req,res)=>{
    try {
        const useremail = await User.findOne({email:req.body.email})
        if(useremail){
            res.json({error:'User with this email already exist, please login or change your email'})
        }
        else{
        const salt = await bcrypt.genSalt()
        const pass = await bcrypt.hashSync(req.body.password,salt)
        const newUser = await User.create({...req.body,password:pass})
        res.json({result:newUser})
        }        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.authUser =async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email}).populate('posts').populate('order')
        if(!user){
            res.json({error:`this ${req.body.email} address is not found`})
        }
        else{
            const passCompare = await bcrypt.compareSync(req.body.password,user.password)
            if(passCompare){
              res.json({result:user})
            }
            else{
                res.json({error:'you have entered an incorrect password'})
            }
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateUser =async(req,res)=>{
    try {
        const user = await User.findById(req.params.uid)
        if(!user){
            res.json({error:'you cannot to update this account'})
        }
        else{
            const uuser = await User.findByIdAndUpdate(req.params.uid,{...req.body},{new:true})
            res.json({result:uuser})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteUser =async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.json({error:'you cannot to delete this account'})
        }
        else{
            const duser = await User.findByIdAndDelete(req.params.id)
            res.json({result:duser})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}