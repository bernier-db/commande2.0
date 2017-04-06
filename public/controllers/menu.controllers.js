angular.module("app")

.controller('MenuCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {


    $scope.tableId = $cookies.get('tableId');


    $http.get('/menu').then(function (data) {
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

    $scope.addToOrder = function (but, meal) {
        var li = document.createElement('li'),
            delBut = document.createElement('button'),
            hidIn = document.createElement('input');

        hidIn.setAttribute("type", "hidden");
        hidIn.setAttribute("value", meal._id);
        hidIn.setAttribute("class", "orderedId");

        delBut.className = "w3-button w3-tiny w3-red";
        delBut.textContent = "X";
        delBut.style.padding = "4px 8px";

        li.textContent = meal.name + " ";
        li.style.fontSize = "20px";
        li.style.fontFamily = "raleway";
        delBut.onclick = delMeal;


        li.appendChild(delBut);
        li.appendChild(hidIn);
        document.getElementById('orderedItems').appendChild(li);

        $('#nbItems')[0].innerText = ++nbItem;
        $("#sendOrderBtn").prop('disabled', false);
    }

    $scope.sendOrder = function (order) {

        var req = {
            item: order.items,
            table: order.tableId,
            date: new Date().setHours(0,0,0,0),
            url: '/#!/menu',
            closed: false,
            waiter: ""
        }
        console.log("on envoieeee", req);
        $http.post('plan/addOrder', req);
    }

}]);