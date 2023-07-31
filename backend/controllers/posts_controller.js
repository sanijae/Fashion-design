const Post = require('../databases/post_model') 
const User = require('../databases/users_model') 
const Vendor = require('../databases/vendor_model') 

exports.getAllPosts =async(req,res)=>{
    try {
        const post = await Post.find().populate('createdBy').sort({$natural:-1}).lean()
        const countPost = await Post.countDocuments()
        res.json({countPost,result:post})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getUserPosts =async(req,res)=>{
    try {
        //Vendor.findById(req.params.uid).populate('posts')
        const post = await Post.find({createdBy:req.params.uid}).sort({$natural:-1}).lean()
        const countPost = await Post.countDocuments()
        res.json({countPost,result:post})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.getPost =async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id).populate('createdBy').lean()
        res.json({result:post})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.createPost =async(req,res)=>{
    try {
        //const user = await User.findById(req.params.uid)
        const vid = await Vendor.findById(req.params.vid)
        const post = await Post.create({...req.body,createdBy:vid})
        await Vendor.findByIdAndUpdate(req.params.vid,{$push:{posts:post._id}},{new:true})
        res.json({result:post})        
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.addImages =async(req,res)=>{
    try {
        const picArray = []
        const pictures = req.files
        if(pictures){
           pictures.forEach(pic => {
            const file = { filename:pic.originalname }
            picArray.push(file)
           });
        }
        const post = await Post.findByIdAndUpdate(req.params.postId,{images:picArray},{new: true})
        res.json({result:post})
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.deletePost =async(req,res)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.json({result:post})       
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.updatePost =async(req,res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,{...req.body},{new: true})
        res.json({result:post})       
    } catch (error) {
        res.json({error:error.message})
    }
}
exports.getQueryPost =async(req,res)=>{
    const regexp = {
        type: new RegExp(req.query.title,'i'),
        category: new RegExp(req.query.category,'i')
    }
    try {
      const post = await Post.find(
        {
            '$or':[
                {type:{$regex:req.params.key}},{category:{$regex:req.params.key}}
            ]
        }
      ).populate('createdBy')
        //const post = await Post.find(regexp)
        const countPost = await Post.countDocuments()
        res.json({countPost,result:post})
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateUserPost =async(req,res)=>{
    try {
        const user = await User.findOne({user:req.body.uid})
        //const admin = await Post.findOne({user:req.params.uid})
        if(user){
            const post = await Post.findByIdAndUpdate(req.params.id)
            res.json({result:post})
        }
        else{
            res.json({error:'Please you are not permitted to update this account'})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteUserPost =async(req,res)=>{
    try {
        const user = await User.findOne({user:req.body.uid})
        if(user){
            const post = await Post.findByIdAndDelete(req.params.id)
            res.json({result:post})
        }
        else{
            res.json({error:'Please you are not permitted to delete this account'})
        }
    } catch (error) {
        res.json({error:error.message})
    }
}
