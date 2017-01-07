'use strict';

// Declare app level module which depends on views, and components
angular.module('clockOS', [
  'ngRoute',
  'clockOS.home',
  'clockOS.view1',
  'clockOS.view2',
  'clockOS.clock',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
