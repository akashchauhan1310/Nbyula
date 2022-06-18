const express = require('express')
const app = express()
const dotev = require('dotenv').config()
const PORT = process.env.PORT || 5000


app.listen(PORT,() => console.log(`Listening on PORT : ${PORT}`))