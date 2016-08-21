redtab.services.factory('AuthenticationFactory', function($window) {
  var auth = {
    isLogged: false,
    check: function() {
      if ($window.localStorage.token && $window.localStorage.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    }
  }
 
  return auth;
})

.factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
  return {
    login: function(email, password) {
      return $http({
            url: 'http://admin.radtab.co/api/v1/login',
            method: 'POST',
            data: { email: email, password: password }, // Make sure to inject the service you choose to the controller
            
        })
    },
    register: function(email, password) {
      return $http({
            url: 'http://admin.radtab.co/api/v1/register',
            method: 'POST',
            data: { email: email, password: password }, // Make sure to inject the service you choose to the controller
            
        })
    },
    logout: function() {
      if (AuthenticationFactory.isLogged) {
 
        AuthenticationFactory.isLogged = false;
        delete AuthenticationFactory.user;
  
        delete $window.localStorage.token;
        delete $window.localStorage.user;
        if($window.localStorage.fbId){
            delete $window.localStorage.fbId;
            delete $window.localStorage.fbName;
        }
        $location.path("/login");
      }
 
    }
  }
})

.factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers['x-auth-token'] = $window.localStorage.token;
       // config.headers['Content-Type'] = "application/x-www-form-urlencoded";
      }
      return config || $q.when(config);
    },
 
    response: function(response) {
      return response || $q.when(response);
    }
  };
});