var url ='http://127.0.0.1:3000/act';  
var chillApp = angular.module('chillApp', []); 

chillApp.controller('chillAppCtrl',[ '$scope', '$http',  function($scope, $http){
    
    

    $scope.state = true ; 

    $scope.changeState = function(){
        $scope.state = !$scope.state; 
    }

    $scope.fetch = function(){
        console.log("requesting"); 
        $scope.state = true; 
        $http.get(url).success(function(response){ $scope.activity = response; });
    };

    $scope.addActivity = function (){
        console.log($scope.text);
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
            data: $scope.text
        }).success(function () {
            console.log('Did it')
            $scope.activity = $scope.text.toLowerCase() + " and chill." ; 
            $scope.changeState(); 
        }); 
    }; 
   $scope.activity =  $scope.fetch();  
}]);
