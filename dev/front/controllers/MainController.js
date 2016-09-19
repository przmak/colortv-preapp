/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var mainController = function ($scope,$http,apiService){
    var that = this;    
    $scope.init = function(data){
        that.list = data.list;
    };
    $scope.activeCountry = {};
    that.activeCountry = {};
    that.cityDataInfo = null;
    that.showErrors = function (errors){
        //ToDo: Specification didn't require it, leaving log
        console.log("error",errors);
    };
    that.fillCountryInfo = function(data){
        that.cityDataInfo = data.data.query.results.channel;
    };
    that.cityChanged = function(activeCountry){
        apiService.loadCityWeather(activeCountry.zip).
                then(that.fillCountryInfo,that.showErrors);   
    };
	/**
	*Array of zips as String || Number
	*/
    that.multipleCityReq = function(zips){
        apiService.loadCitiesWeather(zips).then(function(data){
            //ToDo: Specification didn't require it, leaving log
            console.log(data)
        })
        
    };
};
angularapp.controller('MainController',mainController);
mainController.$inject = ['$scope','$http','apiService'];