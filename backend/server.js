const express = require('express')
const app = express()
const dotev = require('dotenv').config()
const PORT = process.env.PORT || 5000
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./connectDB')

connectDB()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/api/v1/users',userRoutes)

app.listen(PORT,() => console.log(`Listening on PORT : ${PORT}`))