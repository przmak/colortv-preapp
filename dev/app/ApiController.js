/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = function(app){
    var that = {};
    that.validateParams = function(params){
        //Check if parameter is present
        if(!params.zip && !params.zips){
            return false;
        }
        var key = "";
        if(params.zip){// check if param is string
            key = "zip";
            if(typeof params.zip !== "string")return false;
        }else{
            key = "zips";
            if(typeof params.zips === "string")return false;
        }
        return {
            key : key
        }
        
    }
    that.getCityWeather = function (){
        //var query = new YQL('select * from weather.forecast where woeid=12795674');
    }
    that.getCityWOEID = function (zip){
        return new globalObjects.promise(function(resolve, reject){
            resolve(123);
            var q = new globalObjects.YQL("select woeid fr6565om geo.places where text='"+ zip +"' limit 1");            
            q.exec(function(err,res){
                if (err) reject(err);
                else resolve(res);
            })
        })
        
        
    }
    that.sendError = function(req,res,code){
        res.statusCode = code;
        res.send(req.body);
    }
    app.post('/api/getCityInfo',function(req,res){ 
        var validate = that.validateParams(req.body);
        if(!validate){
            //Error
            that.sendError(req,res,400);
        }else{
            switch(validate.key){
                case "zip":{
                        that.getCityWOEID(req.body.zip).then(function(){
                            console.log("??")
                        });
//                        if(_res.error){
//                            that.sendError(req,res,400);
//                        }
                        break;
                }
                case "zips":{
                        break;
                }
            }           
        }
        
        
        var zip = req.body.zip;
        
        console.log();
    });
}