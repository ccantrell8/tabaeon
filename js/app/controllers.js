var tabaeonApp = angular.module('tabaeonApp', []);

tabaeonApp.controller('MainCtrl', function ($scope) {
  //Set list of tabs to scope
	chrome.tabs.query({
		//active: true,
		currentWindow: true
	}, function(tabs) {
		$scope.tabList = tabs[0];
    console.log(tabs);
	});
});