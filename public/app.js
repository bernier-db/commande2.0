var app = angular.module('app',['ngRoute', 'ngCookies']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.eagerInstantiationEnabled(false);
	$routeProvider.
        when('/gestion', {
            templateUrl: 'views/gestion.view.html',
            controller: 'GestionCtrl'
        }).
    when('/scan', {
        templateUrl: 'views/scan.view.html',
        controller: 'ScanCtrl'
    }).
    when('/menu', {
        templateUrl: 'views/menu.view.html',
        controller: 'MenuCtrl'
    }).
    otherwise("/scan");
}]);