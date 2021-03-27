const express = require('express')
const app = express()
const port = 3001

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send()
})

app.listen(port, () => {
  console.log(`We runnin at port ${port}`)
})