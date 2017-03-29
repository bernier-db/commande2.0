angular.module("app")

.controller('MenuCtrl', ['$scope','$http','$cookies', function($scope, $http, $cookies){
    
	$scope.tableId = $cookies.get('tableId');
}]);