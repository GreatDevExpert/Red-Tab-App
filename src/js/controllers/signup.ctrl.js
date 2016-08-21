redtab.controllers.controller('SignupCtrl', function($scope,$state, $stateParams,$ionicPopup,UserAuthFactory,AuthenticationFactory,$window,App) {
    $scope.signupData = {};
   console.log($window.localStorage.token);
    $scope.signUp = function() {
      var email = $scope.signupData.email;
      var password = $scope.signupData.password;
      var confirmPassword = $scope.signupData.confirmPassword;
      var emailReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      
      if (email !== undefined  && password !== undefined) {
          if(!emailReg.test(email)){
                $ionicPopup.alert({content:'Invalid email'});
                return;
          }
          if(password !== confirmPassword){
                $ionicPopup.alert({content:'Passwords does not match'});
                return;
          }
         App.showLoading();
        UserAuthFactory.register(email, password).success(function(data) {
            if(data.success == true){
                AuthenticationFactory.isLogged = true;
                AuthenticationFactory.user = data.id;
        
                $window.localStorage.token = data.api_token;
                $window.localStorage.user = data.id; // to fetch the user details on refresh
                $state.go('app.home');
            }else{
                $ionicPopup.alert({content:status.showToUser});
            }
         // $location.path("/");
                App.hideLoading();
 
        }).error(function(status) {
          $ionicPopup.alert({content:status.showToUser});
                App.hideLoading();
        });
      } else {
          $ionicPopup.alert({content:'Invalid details'});
      }
 
    };
});