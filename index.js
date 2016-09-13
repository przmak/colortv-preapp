/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var express = require('express');


var config = require("./release/server/config.json");
var server = require("./release/server/server.js");


var app = express();


app.use('/public',express.static('bower_components'));
app.use('/front',express.static('release/front'));

server.init(app,config);



