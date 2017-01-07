'use strict';

angular.module('clockOS.home', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl',
    css: 'css/home.css'
  });
}])

.controller('HomeCtrl', [function() {

}]);
