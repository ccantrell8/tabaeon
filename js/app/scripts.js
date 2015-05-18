var tabaeonApp = angular.module('tabaeonApp', []);

tabaeonApp.controller('MainCtrl', function ($scope, $timeout) {
    $scope.isRunning = false;
    chrome.tabs.query({
        currentWindow: true
    }, function(tabs) {
        console.log(tabs);
        $scope.aeon = [];
        for(var i=0; i<tabs.length; i++) {
            $scope.aeon.push({
                'id': tabs[i].id,
                'name': tabs[i].title,
                'active': tabs[i].active,
                'duration': 60,
                'refresh': false
            });
        }
        $scope.$apply();
        console.log($scope.aeon);
    });

    $scope.start = function() {
        chrome.tabs.update($scope.aeon[0].id, {active: true});
        chrome.runtime.sendMessage({
            aeon: $scope.aeon,
            command: 0
        },function(response) {
          console.log(response);
        });
        $scope.isRunning = true;
    };

    $scope.stop = function() {
        chrome.runtime.sendMessage({
            command: 1
        },function(response) {
          console.log(response);
          $scope.isRunning = false;
        });
    };
});