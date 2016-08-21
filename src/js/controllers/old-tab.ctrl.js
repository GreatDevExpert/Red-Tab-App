redtab.controllers.controller('OldtabCtrl', function($scope, $stateParams,$state) {
    $scope.title = $stateParams.tabId;
     $scope.goToHome = function(){
        $state.go("app.home");
    }
});