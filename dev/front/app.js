/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angularapp = angular.module('colorTvDemo', []);

// Personaly here we could put some automatic logic, to assign all controllers
// from controllers directory to application, althought I will use only 1
// in this application I will skip it.

angularapp.controller('MainController',mainController);
mainController.$inject = ['$scope','$http'];