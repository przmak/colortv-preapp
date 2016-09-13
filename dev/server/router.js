/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var path = require('path');
export default class {
    constructor(app){
         app.get('/', function (req, res) {            
            var data = {
                title: "Color TV App",
                list: [
                    {name: "New York", id: 1 },
                    {name:"Los Angeles", id: 2 },
                    {name:"Chicago", id: 3 },
                    {name:"Huston", id: 4 },
                    {name:"Phoenix", id: 5}
                ]
            };
            res.render(path.join(__dirname + '/index'),data);
        });
        app.post('/getCountryInfo',function(req,res){         
            
        });
    }
}