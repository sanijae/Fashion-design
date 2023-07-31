const Vendors = require('../databases/vendor_model') 
const User = require('../databases/users_model') 


exports.getAllVendors =async(req,res)=>{
    try {
        const vendors = await Vendors.find().sort({$natural:-1}).lean()
        const countVend = await Vendors.countDocuments()
        res.json({countVend,result:vendors})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getVendor =async(req,res)=>{
    try {
        const vendors = await Vendors.findOne({user:req.params.id}).lean()
        res.json({result:vendors})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.registerVendor =async(req,res)=>{
    try {
        const user = await User.findById(req.params.uid)
        if(!user){
            res.json({error:'Please you need to have user account before vendor account'})
        }
        else{
        const vendors = await Vendors.create({...req.body,user:user._id})
        res.json({result:vendors})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}


exports.deleteVendor =async(req,res)=>{
    try {
        const vendor = await Vendors.findByIdAndDelete(req.params.id)
        res.json({result:vendor})       
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.updateVendor =async(req,res)=>{
    try {
        const vendor = await Vendors.findByIdAndUpdate(req.params.id,{...req.body},{new: true})
        res.json({result:vendor})       
    } catch (error) {
        res.json({error:error.message})
    }
}


exports.updateVendorAcc =async(req,res)=>{
    try {
        const user = await Vendors.findOne({user:req.body.uid})
        //const admin = await Vendors.findOne({user:req.params.uid})
        if(user){
            const vendors = await Vendors.findByIdAndUpdate(req.params.id)
            res.json({result:vendors})
        }
        else{
            res.json({error:'Please you are not permitted to update this account'})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteVendorAcc =async(req,res)=>{
    try {
        const user = await Vendors.findOne({user:req.body.uid})
        //const admin = await Vendors.findOne({user:req.params.uid})
        if(user){
            const vendors = await Vendors.findByIdAndDelete(req.params.id,{...req.body},{new:true})
            res.json({result:vendors})
        }
        else{
            res.json({error:'Please you are not permitted to delete this account'})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}
