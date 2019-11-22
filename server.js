const express = require('express');
const parser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('static'))
app.use(parser.json());

app.listen(port, () => {
  console.log(`listening on port ${ port }`);
});