/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var path = require('path');
export default class {
    constructor(app){
         app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname + '/index.html'));
        });
    }
}