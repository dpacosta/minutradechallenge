'use strict';

var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var clients = require('./lib/clients');

clients.routes(router);
app.use('/', router);
app.use(express.static(__dirname + "/app"));
app.use(bodyParser.json());
app.listen(3000);

module.exports = app;
