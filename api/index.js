const app = require('express')()


app.get('/', function (req, res) {
  res.send('hello world')
}),


module.exports = {
    path: '/api',
    handler: app
}






