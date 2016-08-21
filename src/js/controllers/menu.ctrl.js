redtab.controllers.controller('MenuCtrl', function($scope, $stateParams,$state,$http,App) {
    
    $scope.init = function () {
        App.showLoading();
        $scope.location = $stateParams.location;
        $scope.title = $scope.location.name;
       $http.get(App.baseUrl+'locations/'+ $scope.location._id +'/categories').success(function(response){
            if(response.success){
                App.hideLoading();
                $scope.categories = response.data;
            }
        })
        .error(function(response){
                App.hideLoading();
        });
    }
      
  
    /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */
    $scope.toggleGroup = function(group) {
        $scope.menuitems = [];
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            App.showLoading(); 
            $http.get(App.baseUrl+'locations/'+ $scope.location._id +'/categories/' + group._id + '/menuitems')
            .success(function(response){
                if(response.success){
                    App.hideLoading();
                     $scope.shownGroup = group;
                    $scope.menuitems = response.data;
                }
            })
            .error(function(response){
                    App.hideLoading();
            });
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
    
    $scope.goToHome = function(){
        $state.go("app.home");
    };
    $scope.init();
});