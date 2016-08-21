redtab.controllers.controller('HistoryCtrl', function($scope, $stateParams,$state) {
    $scope.history = [
       {
            "id":1,
            "u_id":"G5A4R2",
            "item_name":"item name 1",
            "item_price":"12",
            "item_date_time":"july 31, 20013 - 12:47 pm "
        },
        {
            "id":2,
            "u_id":"G5A6R2",
            "item_name":"item name 2",
            "item_price":"10",
            "item_date_time":"july 31, 20013 - 12:47 pm "
        },
        {
            "id":3,
            "u_id":"H5A4G2",
            "item_name":"item name 3",
            "item_price":"12",
            "item_date_time":"july 31, 20013 - 12:47 pm "
        },
        {
            "id":4,
            "u_id":"G5O4R9",
            "item_name":"item name 4",
            "item_price":"12",
            "item_date_time":"july 31, 20013 - 12:40 pm "
        },
        {
            "id":5,
            "u_id":"G7A4R2",
            "item_name":"item name 5",
            "item_price":"12",
            "item_date_time":"july 31, 20013 - 12:47 pm "
        },
    ]
    $scope.oldTab = function(tabId){
        $state.go("app.oldtab",{tabId:tabId});
    }
    $scope.goToHome = function(){
        $state.go("app.home");
    };
});