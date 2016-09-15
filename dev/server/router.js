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
            var title =  "Color TV App";
            title =  "App";
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
        
        app.post('/getCountryInfo',function(req,res){         
            var fn = function (error,response){
                console.log("??");
                console.log(response);
                console.log(response.query.results.channel);    
            }
            //var query = new YQL('select * from weather.forecast where woeid=12795674');
            
            var q = new YQL("select woeid from geo.places where text='10001' limit 1");
            var q2 = new YQL("select woeid from geo.places where text='10002' limit 1");
            q.exec(function (error, response) {
                        // Do something with results (response.query.results)
                    console.log((response.query.results))
//                    console.log((response.query.results.channel.item.condition));
//                    console.log((response.query.results.channel.item));
//                    console.log((response.query.results.channel.item.forecast));
            });
            
            q2.exec(function (error, response) {
                        // Do something with results (response.query.results)
                    console.log((response.query.results))
//                    console.log((response.query.results.channel.item.condition));
//                    console.log((response.query.results.channel.item));
//                    console.log((response.query.results.channel.item.forecast));
            });
            //YQL('SELECT * FROM weather.forecast WHERE (location = @zip)').setParam('zip', 94089).setConfig('ssl', true).exec(fn)
            
        });
    }
}