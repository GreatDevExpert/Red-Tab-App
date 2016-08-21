redtab.controllers.controller('AppCtrl', function($scope, $ionicModal, $timeout, UserAuthFactory,$window,$http,App) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.init = function(){
       if($window.localStorage.fbId){
            $scope.sideMenuName = $window.localStorage.fbName;
        }else{
            $scope.sideMenuName = $window.localStorage.userEmail
        }
        $http.get(App.baseUrl + 'me/payments/cards').success(function (response) {
            if(response.success){
                $scope.cards = response.data;
            }
        })
         $scope.userEmail = $window.localStorage.userEmail;
        $scope.tab = {
            "is_open":1,
            "tax":4,
            "tip":0,
            "processing":1.5,
            "sub_total":0,
            "total":0,
            "tab_items":[
                {
                    "item_name":"item 1",
                    "item_price":8,
                    "item_desc":"#hello #hi #example"
                },
                {
                    "item_name":"item 2",
                    "item_price":5,
                    "item_desc":"#hello #hi #example"
                },
                {
                    "item_name":"item 5",
                    "item_price":7,
                    "item_desc":"#hello #hi #example"
                }
            ]
        }
        angular.forEach($scope.tab.tab_items,function(item){
            $scope.tab.sub_total += item.item_price;
        });
        $scope.tipActive = 10;
        $scope.tab.total = $scope.tab.sub_total + $scope.tab.tax + $scope.tab.processing;
        
        $scope.tip(10);
            
  }
 

    $scope.tip = function(tip){
        $scope.tipActive = tip;
        if(tip==1){
            $scope.tab.tip += 1;
            $scope.tab.total += 1;
            return;
        }
        $scope.tab.total -= $scope.tab.tip;
        $scope.tab.tip = (tip/100) * $scope.tab.sub_total;
        $scope.tab.total += $scope.tab.tip;
    }
    $scope.isTipActive = function(tip){
        if($scope.tipActive === tip){
            return true;
        }
        return false;
    }
    
    
    $scope.logout = function () {
        UserAuthFactory.logout();
    }
    
    $scope.init();
  
});
 