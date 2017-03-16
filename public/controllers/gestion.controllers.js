angular.module("app")

.controller('GestionCtrl', ['$scope','$http', function($scope, $http){
	$http.get('/gestion').then(function(data){
		$scope.meals = data.data.meals;
        $scope.orders = data.data.orders;
        console.log(data.data.orders);
	});
}]);