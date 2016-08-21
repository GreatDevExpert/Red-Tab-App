redtab.controllers.controller('MenuitemCtrl', function($scope, $stateParams,$state,$http,App) {
    $scope.item = $stateParams.item;
    $scope.location = $stateParams.location;
    $scope.title = $scope.location.name;
    
    $scope.goToHome = function(){
        $state.go("app.home");
    }
});