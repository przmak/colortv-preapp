/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function service($http) {
    /**
     * 
     * @param String or Array of Strings referencing to zip codes
     * @returns promise
     */
    this.loadCitiesWeather = function(zips){
        var data = {};
        if(typeof zips === "string"){
            data.zip = zips;
        }else{
            data.zips = zips;
        }
        var config = {
            url: "/api/getCityInfo",
            method: "POST",
            data: data
        }
        return $http(config);
    }
}
angularapp.service('apiService', service).$inject = ['$http'];;