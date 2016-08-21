redtab.controllers.controller('LoginCtrl', function($scope, $stateParams,$window,$state,UserAuthFactory, $cordovaOauth,AuthenticationFactory,$ionicPopup,App,$http) {
    $scope.user = {};
   console.log($window.localStorage.token);
    $scope.doLogin = function() {
      var email = $scope.user.email;
      var password = $scope.user.password;
 
      if (email !== undefined  && password !== undefined) {
         App.showLoading();
        UserAuthFactory.login(email, password).success(function(data) {
            if(data.success == true){
                AuthenticationFactory.isLogged = true;
                AuthenticationFactory.user = data.id;
                $window.localStorage.userEmail = email;
                $window.localStorage.token = data.api_token;
                $window.localStorage.user = data.id; // to fetch the user details on refresh
                $state.go('app.home');
            }else{
                $ionicPopup.alert({content:status.showToUser});
            }
             App.hideLoading();
 
        }).error(function(status) {
          $ionicPopup.alert({content:status.showToUser});
                App.hideLoading();
        });
      } else {
          $ionicPopup.alert({content:'Invalid credentials'});
      }
 
    };
    
    $scope.fbLogin = function () {
        $cordovaOauth.facebook("998938043530635", ["email", "public_profile"])
        .then(function(result) {
            $window.localStorage.accessToken = result.access_token;
            //$ionicPopup.alert({content:result.access_token});
            displayData(result.access_token);
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    }
    
    
    function displayData( access_token)
    {
        $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "id,email,first_name,last_name", format: "json" }}).then(function(result) {
            
            userData = {
                email:result.data.email,
                facebook:result.data.id,
                first_name:result.data.first_name,
                last_name:result.data.last_name
            }
         //   $ionicPopup.alert({content:name});
            postData(userData);
        }, function(error) {
            alert("Error: " + error);
        });
    }
    
     function postData(userData) {
         //$ionicPopup.alert({content:userData.facebook});
                $http.post(App.baseUrl + 'auth/facebook',userData).success(function(data) {
              //    $ionicPopup.alert({content:userData.facebook});
                    if(data.success == true){
                        AuthenticationFactory.isLogged = true;
                        AuthenticationFactory.user = data.id;
                
                        $window.localStorage.userEmail = userData.email;
                        $window.localStorage.token = data.api_token;
                        $window.localStorage.user = data.id; // to fetch the user details on refresh
                        $window.localStorage.fbId = userData.facebook;
                        $window.localStorage.fbName = userData.first_name + " " + userData.last_name;
                        $state.go('app.home');
                    }else{
                        $ionicPopup.alert({content:status.showToUser});
                    }
                    App.hideLoading();
        
                }).error(function(status) {
                   $ionicPopup.alert({content:status.showToUser});
                        App.hideLoading();
                });
     }
}); 