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
            if(typeof params.zip !== "string" )return false;
        }else{
            key = "zips";
            if(typeof params.zips === "string")return false;
        }
        return {
            key : key
        }
        
    }
    /**
     *
     * @param woeid INT
     * @returns Promise
     */
    that.getCityWeather = function (woeid){
        var query = new globalObjects.YQL('select * from weather.forecast where woeid=' + woeid);
        var promise = new globalObjects.promise(function (resolve, reject) {
            query.exec(function(error,response){
                if(JSON.stringify(error) !== "null" || response.query.results == null){
                    reject(error);
                }else{
                    resolve(response);
                }
                    
                });
        });

        return promise;
    }

    /**
     * @param String zip
     * @returns {*}
     */
    that.getCityWOEID = function (zip){
        var query = new globalObjects.YQL("select woeid from geo.places where text='"+ zip +"' limit 1");
        var promise = new globalObjects.promise(function (resolve, reject) {
            query.exec(function(error,response){
                if(JSON.stringify(error) !== "null" || response.query.results == null){
                    reject(error);
                }else{
                    resolve(response.query.results.place.woeid);;
                }
            });
        })
        return promise;
    }
    
    that.sendError = function(req,res,code,error){
        var config = {
            path : "./logs/api/yahoo/",
            filename : new Date().getTime() + ".log",
            error: error
        }
        globalObjects.logger(config);
        res.statusCode = code;
        res.send(req.body);
    }
    app.post('/api/getCityInfo',function(req,res){ 
        var validate = that.validateParams(req.body);
        if(!validate){
            //Error
            that.sendError(req,res,400);
        }else {
            switch (validate.key) {
                case "zip":
                {
                    that.getCityWOEID(req.body.zip).then(function (woeid) {
                        that.getCityWeather(woeid).then(function (data) {
                            res.statusCode = 200;
                            res.send(data);   
                        }, function (error) {
                            that.sendError(req, res, 400, error);
                        });
                    }, function (error) {
                        that.sendError(req, res, 400, error);
                    }
                    );
                    break;
                }
                case "zips":
                {
                    break;
                }
            }           
        }
        
        
        var zip = req.body.zip;
        
        console.log();
    });
}