const express = require('express')
const morgan = require("morgan")
const cors = require('cors')
const multer = require('multer')
const userRouter = require('./routers/userRouter')
const filesRouter = require('./routers/fileRouter')


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))



app.get('/', (req, res) => {
    res.send('hallo hai server is started')
})

app.use('/api/image', filesRouter)
app.use("/api/users", userRouter)

module.exports = app