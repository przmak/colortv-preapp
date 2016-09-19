/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var path = require('path');
var apiController = require("../app/ApiController");
export default class {
    constructor(app){
        app.get('/', function (req, res) {            
            var title =  "ColorTV App";
            var data = {
                title: title,
                list: [
                    {name: "Garden City, NY", id: 1, zip: "11530" },
                    {name:"Washington, DC", id: 4, zip: "20004" },
                    {name:"Jacksonville, FL", id: 2, zip: "32204" },
                    {name:"Columbus, OH", id: 3, zip:"43231" },                    
                    {name:"New York, NY", id: 5, zip : "10001"},
                    {name:"Atlanta, GA", id: 5, zip : "30303"},
                ]
            };
            res.render(path.join(__dirname + '/index'),data);
        });
        apiController(app);
        
    }
}