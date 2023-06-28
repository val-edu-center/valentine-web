const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()


const app = express()
const port = process.env.PORT || 3000


const buildPath = path.join(__dirname, 'build')


app.use(express.static(buildPath))
app.use(express.json())
app.use(cors())


// gets the static files from the build folder
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})


// Showing that the server is online and running and listening for changes
app.listen(port, () => {
  console.log(`Server is online on port: ${port}`)
})
