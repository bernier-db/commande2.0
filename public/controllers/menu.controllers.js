angular.module("app")

.controller('MenuCtrl', ['$scope','$http','$cookies', function($scope, $http, $cookies){
    
	$scope.tableId = $cookies.get('tableId');
    $http.get('/menu').then(function(data){
		$scope.meals = data.data.meals;
        $scope.categories = data.data.categories;
       
	});
    
     $scope.openMenu = function (evt, menuName) {
        
        var i, x, tablinks;
        x = document.getElementsByClassName("menu");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < x.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
        }
        document.getElementById(menuName).style.display = "block";
        //evt.currentTarget.className += " w3-red";
    }
    
}]);