/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

fs = require('fs');
globalObjects = {
    promise : require('promise'),
    YQL : require('yql'),
    ejs : require('ejs'),
    logger : function logger(config){
        fs.writeFile(config.path + config.filename, config.error ,function(){
                console.log("Logged Error In File: " + config.path + config.filename);
        }) ;
    }
}




"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var livereload = require('connect-livereload');

var config = require("./release/server/config.json");
var server = require("./release/server/server.js");


var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.use('/public',express.static('bower_components'));
app.use('/front',express.static('release/front'));

server.init(app,config);

app.use(livereload({
    port: 9998
}));
