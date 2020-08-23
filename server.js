const express = require('express');
const fs = require('fs');
const path = require('path');
const datab = require('./db/db.json');
let dpath = path.join(__dirname, '/db/db.json');
const uuid = require('uuid/v1');
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', function(req, res) {
    res.json(datab);
});

app.post("/api/notes", function(req, res) {
  
  var uniqId = uuid();
  var newtask = req.body;
  newtask.id = uniqId;

  datab.push(newtask);
  fs.writeFileSync(dpath,JSON.stringify(datab),function(err,data){
    if (err) throw err;
  })
  res.json(newtask);
});