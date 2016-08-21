redtab.controllers.controller('PaymentsCtrl', function($scope, $stateParams,$state,$http,App,$ionicPopup) {
    $scope.init = function () {
        $scope.showFormDiv = false;
        
    };
    
    $scope.showForm = function () {
        $scope.showFormDiv = true;
    }
    $scope.closeForm = function () {
        $scope.showFormDiv = false;
    }
    $scope.addCard = function (card) {
      if (card !== undefined) {
        App.showLoading();
        Stripe.card.createToken({
            number: card.number,
            cvc: card.cvc,
            exp_month: card.month,
            exp_year: card.year
        }, stripeResponseHandler);
      }else{
            $ionicPopup.alert({content:"Invalid card entries"});
       }
    }
    
    $scope.delete = function(card) {
        $scope.cards.splice($scope.cards.indexOf(card), 1);
        $http.delete(App.baseUrl + 'me/payments/cards/' + card.id)
        .success(function (response) {
            
        })
        .error(function (response) {
            $ionicPopup.alert({content:"Could not delete card due to some error"});
            $scope.cards.push(card);
        })
    }
    
    
    function stripeResponseHandler(status, response) {
        if (response.error) {
              App.hideLoading();
            $ionicPopup.alert({content:response.error.message});
        } else {
            var token = response.id;
            $http.put(App.baseUrl + 'me/payments/cards',{
                stripeToken:token
            }).success(function (response) {
                if(response.success){
                    App.hideLoading();  
                    $scope.cards.push(response.card);
                    $scope.closeForm();
                }
            }).error(function (response) {
                App.hideLoading();                
            })
        }
    }
    
    $scope.goToHome = function(){
        $state.go("app.home");
    }
    $scope.init();
});