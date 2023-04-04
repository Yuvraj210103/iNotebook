const connectToMongo = require('./db');
connectToMongo();
var cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 5050
var cors = require('cors')

app.use(cors())

app.use(express.json())


//Available routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

