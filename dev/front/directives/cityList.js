/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angularapp.directive('cityList',function(){
    return{
        restrict: 'E',
        templateUrl: '/front/views/cityList.html',
        scope: {
            list : "=param",
            selectedCountry : "&selectedCity"
        },
        compile: function compile(tElement, tAttrs, transclude) {
            return {
               pre: function preLink(scope, iElement, iAttrs, controller) {
                   scope.selectedAddress = null;                   
               },
               post: function postLink(scope, iElement, iAttrs, controller) {  
                   scope.getCityData = function(){    
                       if(scope.selectedAddress){
                        scope.selectedCountry({activeCountry: scope.selectedAddress});   
                       }                       
                   }
                   scope.getCityData();
               }
            }
        }
    }
});