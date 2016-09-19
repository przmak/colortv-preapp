/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function service($http) {
    /**
     * 
     * @param String/Int or Array of Strings/Ints referencing to zip codes
     * @returns promise
     */

    this.loadCityWeather = function(zip){
        var data = {
            zip: zip
        };
        var config = {
            url: "/api/getCityInfo",
            method: "POST",
            data: data
        }
        return $http(config);
    }
    
    this.loadCitiesWeather = function(zips){
        var data = {
            zips: zips
        };
        var config = {
            url: "/api/getCitiesInfo",
            method: "POST",
            data: data
        }
        return $http(config);
    }
    
}
angularapp.service('apiService', service).$inject = ['$http'];;