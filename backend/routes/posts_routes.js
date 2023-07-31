const { getAllPosts,getUserPosts, getPost, createPost, deletePost,
    updatePost, addImages, getQueryPost} = require('../controllers/posts_controller')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = require('express').Router()


const multerStore = multer.diskStorage({
 destination:(req,file,cb)=>{
    const postId = req.params.postId
    const dir = path.join(__dirname,`../Images/${postId}/`)
    if(fs.existsSync(dir)){
        cb(null,dir)
    }else{
        fs.mkdirSync(dir)
        cb(null,dir)
    }
 },
 filename:(req,file,cb)=>{
    cb(null, file.originalname)
 }
})

const uploadsImages = multer({storage:multerStore}).array('files')

router.get('/',getAllPosts)
router.get('/:id',getPost)
router.get('/search/:key',getQueryPost)
router.get('/userPost/:uid',getUserPosts)
router.post('/createPost/:vid',createPost)
router.delete('/:id',deletePost)
router.put('/:id',updatePost)
router.put('/addImages/:postId',uploadsImages,addImages)

module.exports = router