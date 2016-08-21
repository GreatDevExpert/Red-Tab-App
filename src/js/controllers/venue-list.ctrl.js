redtab.controllers.controller('VenulistCtrl', function($scope, $stateParams,$state,$http,$window,App) {
    $scope.init = function () {
        $http.get(App.baseUrl+'locations').success(function(response){
            if(response.success){
                 $scope.venues = response.data;
                console.log($window.localStorage.token);
            }
        });
    }
    
    $scope.goToHome = function(){
        $state.go("app.home");
    }
    $scope.selectVenue = function(location){
        $state.go("app.venueselected",{location:location})
    }
    $scope.init();
}); 