const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../databases/admin_model')

exports.getAllAdmins =async(req,res)=>{
    try {
        const admin = await Admin.find().lean()
        res.json({result:admin})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.getAdmin =async(req,res)=>{
    try {
        const admin = await Admin.findId(req.params.id)
        res.json({result:admin})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.registerAdmin =async(req,res)=>{
    try {
        const admin = await Admin.findById(req.params.id)
        if(!admin){
            res.json({error:error.message})
        }
        else{
            const ademail = await Admin.findOne({email:req.body.email})
            if(ademail){
                res.json({error:'User with this email already exist, please login or change your email'})
            }
            else{
            const salt = await bcrypt.genSalt()
            const pass = await bcrypt.hashSync(req.body.password,salt)
            const newAdmin = await Admin.create({...req.body,password:pass})
            res.json({result:newAdmin})
           }
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.authAdmin =async(req,res)=>{
    try {
        const admin = await Admin.findOne({email:req.body.email})
        if(!admin){
            res.json({error:`this ${admin} address is not found`})
        }
        else{
            const passCompare = await bcrypt.compareSync(req.body.password,admin.password)
            if(passCompare){
              res.json({result:admin})
            }
            else{
                res.json({error:'you have entered an incorrect password'})
            }
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateAdmin =async(req,res)=>{
    try {
        const admin = await Admin.findById(req.params.id)
        if(!admin){
            res.json({error:'you canno to update this account'})
        }
        else{
            const uadmin = await Admin.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
            res.json({result:uadmin})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteAdmin =async(req,res)=>{
    try {
        const admin = await Admin.findById(req.params.id)
        if(!admin){
            res.json({error:'you canno to delete this account'})
        }
        else{
            const uadmin = await Admin.findByIdAndDelete(req.params.id)
            res.json({result:uadmin})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}