angular.module("app")

.controller('ScanCtrl', ['$scope','$http','$cookies', function($scope, $http, $cookies){
	$scope.saveTable = function(id){
	    $cookies.put('tableId', id);
	}
}]);