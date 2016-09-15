/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angularapp.directive('cityInfo',function(){
    return{
        restrict: 'E',
        templateUrl: '/front/views/cityInfo.html',
        scope: {
            country : "=param"
        },
        compile: function compile(tElement, tAttrs, transclude) {
            return {
               pre: function preLink(scope, iElement, iAttrs, controller) {
                   
               },
               post: function postLink(scope, iElement, iAttrs, controller) {                   
                   
               }
            }
        }
    }
});