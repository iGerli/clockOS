'use strict';

angular.module('clockOS.clock', [])

.component('clock', {
  bindings: {
    format: '@',
    size: '@'
  },
  templateUrl: 'components/clock/clock.html',
  controller: 'ClockCtrl',
})

.controller('ClockCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.tickInterval = 1000 //ms

   var tick = function() {
       $scope.clock = Date.now() // get the current time
       $timeout(tick, $scope.tickInterval); // reset the timer
   }

   // Start the timer
   $timeout(tick, $scope.tickInterval);
}]);
