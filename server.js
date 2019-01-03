#!/usr/bin/env nodejs
var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var compression = require("compression");
var helmet = require('helmet');

var config = require('./config.js').get(process.env.NODE_ENV);

app.set('views', './views');
app.set('view engine', 'jade');

app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/images", express.static(__dirname + '/images', {maxAge: 86400000}));

fs.readdirSync('./controllers').forEach(function (file) {
  if (file.substr(-3) == '.js') {
    var route = require('./controllers/' + file);
    route.controller(app);
  }
});

app.listen(config.PORT,"0.0.0.0");