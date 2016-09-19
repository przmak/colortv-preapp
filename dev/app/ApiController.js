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
        if(params.zip){// check if param is string || number
            key = "zip";
            if(!(typeof params.zip === "string" || Number(params.zip)))return false;
        }else{
            key = "zips";
            if(params.zips.constructor !== Array)return false;
        }
        return {
            key : key
        };
        
    };
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
     * 
     * @param {Array of Ints} woeids
     * @returns {undefined}
     */
    that.getCitiesWeather = function(woeids){    
        var data = {
            errors : [],
            data : []
        };
        var counter = 0;
        var promise = new globalObjects.promise(function (resolve, reject) {
            woeids.forEach(function(woeid){
                var query = new globalObjects.YQL('select * from weather.forecast where woeid=' + woeid);
                query.exec(function(error,response){
                    counter++;
                    if(JSON.stringify(error) !== "null" || response.query.results == null){
                        data.errors.push(error)
                    }else{
                        data.data.push(response) 
                    };
                    if(counter === woeids.length){                        
                        resolve(data);
                    }
                });
            }); 
        });        
        return promise;
    };

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
        });
        return promise;
    };
    
    
    that.getCitiesWOEID = function (zips){
        var data = {
            errors : [],
            woeids : []
        };
        var counter = 0;
        var promise = new globalObjects.promise(function (resolve, reject) {
            zips.forEach(function(zip){
                var query = new globalObjects.YQL("select woeid from geo.places where text='" + zip + "' limit 1");
                query.exec(function (error, response) {
                    counter ++;
                    if(JSON.stringify(error) !== "null" || response.query.results == null){
                        data.errors.push(error);
                    }else{
                        data.woeids.push(response.query.results.place.woeid);
                    }
                    if(counter === zips.length)resolve(data);
                });
            });            
        });
        return promise;        
    };
    
    that.sendError = function(req,res,code,error){
        if(!error){
            error = Object.assign({},globalObjects.errorPat);
        }
        var config = {
            path : "./logs/api/yahoo/",
            filename : new Date().getTime() + ".log",
            error: JSON.stringify(error)
        }
        globalObjects.logger(config);
        res.statusCode = code;
        res.send(req.body);
    }
    that.validateZip = function(zip){
        if(!(typeof zip === "string" || Number(zip)))return false;
        return true;
    }
    that.validateZips = function(zips){        
        if(!Array.isArray(zips))return false;
        var flag = true;
        zips.forEach(function(zip){
            if(flag){
                flag = that.validateZip(zip);
            }
        });
        return flag;
    }    
    app.post('/api/getCityInfo', function (req, res) {
        var params = req.body;
        if(!that.validateZip(params.zip)){
            that.sendError(req,res,400);
        }
        
        that.getCityWOEID(params.zip).then(function (woeid) {
                            that.getCityWeather(woeid).then(function (data) {
                                res.statusCode = 200;
                                res.send(data);
                            },function(error){
                                that.sendError(req, res, 400, error);
                            });
                        },function(error){
                            that.sendError(req, res, 400, error);
                        });   
    });   
    
    app.post('/api/getCitiesInfo', function (req, res) {
       var params = req.body;       
       if(!that.validateZips(params.zips)){
           that.sendError(req,res,400);
       };
       that.getCitiesWOEID(params.zips).then(function(woeids){
            that.getCitiesWeather(woeids.woeids).then(function(weather){
                res.statusCode = 200;
                res.send(weather);
          });
        });
    });
}