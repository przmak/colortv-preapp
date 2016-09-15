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
    that.showErrors = function (){
        console.log("error");        
    }
    that.fillCountryInfo = function(data){
        console.log(data);
    }
    that.countryChanged = function(activeCountry){
        apiService.loadCitiesWeather(activeCountry.zip).
                then(that.fillCountryInfo,that.showErrors);   
    }
}
angularapp.controller('MainController',mainController);
mainController.$inject = ['$scope','$http','apiService'];