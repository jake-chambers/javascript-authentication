const express = require('express');
const parser = require('body-parser')
const fs = require('fs');
var https = require('https')
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static('static'))
app.use(parser.json());

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

app.post('/authenticate', function(req,res){
  res.send("we livin famo")
})

https.createServer(options, app)
.listen(3000, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})