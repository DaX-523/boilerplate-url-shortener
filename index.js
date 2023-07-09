require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const shortid = require('shortid')
// Basic Configuration
const port = process.env.PORT || 3000;

const urlobj = {};

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:short_url', function(req, res) {
  const shortURL = req.params.short_url;
  res.redirect(urlobj[shortURL])
})

app.post('/api/shorturl', function(req, res) {
  const shortURL = shortid.generate();
const urlRegex = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
  if (!urlRegex.test(req.body.url)) {
    res.json({
      error: 'invalid url'
    })
  }  else {
  
  urlobj[shortURL] = req.body.url;
  
  res.json({
    original_url: req.body.url,
    short_url: shortURL
  })
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
  
});
