/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var mainController = function ($scope,$http){
    var that = this;    
    $scope.init = function(data){
        that.list = data.list;
    };
    $scope.activeCountry = {};
    that.activeCountry = {};
    that.countryChanged = function(activeCountry){
        var config = {
            method : "POST",
            url: "/getCountryInfo",
            data: [activeCountry],
        }
        $http(config).then(function(){
            
        },function(){
            
        })
    }
}