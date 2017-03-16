var app = angular.module('app',['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.eagerInstantiationEnabled(false);
	$routeProvider.
        when('/gestion', {
            templateUrl: 'views/gestion.view.html',
            controller: 'GestionCtrl'
        })
}]);