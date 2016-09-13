/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angularapp.directive('countryList',function(){
    return{
        restrict: 'E',
        templateUrl: '/front/views/countryList.html',
        scope: {
            list : "=param",
            selectedCountry : "&selectedCountry"
        },
        compile: function compile(tElement, tAttrs, transclude) {
            return {
               pre: function preLink(scope, iElement, iAttrs, controller) {
                   scope.selectedAddress = scope.list[0];                   
                   
               },
               post: function postLink(scope, iElement, iAttrs, controller) {  
                   scope.getCityData = function(){                       
                       scope.selectedCountry({activeCountry: scope.selectedAddress});
                   }
                   scope.getCityData();
               }
            }
        }
    }
});