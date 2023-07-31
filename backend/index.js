const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

//connections
const port = process.env.PORT || 5000
const dbURL = process.env.dbURL || 'mongodb://localhost:27017/naija_boutique'

// utils
app.use(cors())
app.use(express.json({limit:'5mb',extended:true}))
app.use(express.urlencoded({limit:'5mb',extended:true}))
app.use(express.text({limit:'5mb'}))
app.use('/boutique/images',express.static(path.join(__dirname,'./Images')))

//api channels
app.use('/boutique/admins',require('./routes/admin_routes'))
app.use('/boutique/users',require('./routes/users_routes'))
app.use('/boutique/vendors',require('./routes/vendors_routes'))
app.use('/boutique/posts',require('./routes/posts_routes'))
app.use('/boutique/orders',require('./routes/orders_routes'))

mongoose.connect(dbURL,{family:4})
 .then(()=>app.listen(port,()=>console.log('server started on port ',port)))
 .catch((error)=>console.log(error))