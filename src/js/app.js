// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var redtab = {
  controllers: angular.module('redtab.controllers', []),
  services: angular.module('redtab.services', [])
};
angular.module('redtab', ['ionic', 'redtab.controllers', 'redtab.services', 'ngCordova','ngCordovaOauth'])

    .run(function($rootScope,$ionicPlatform,AuthenticationFactory,$state,$http,App) {
        
        AuthenticationFactory.check();
        if(!AuthenticationFactory.isLogged){
            $state.go('login');
        }else{
            $http.get(App.baseUrl + 'me/stripe_pub_key').success( function (response) {
                if(response.success){
                    console.log(response.stripe_pub_key);
                    Stripe.setPublishableKey(response.stripe_pub_key);
                }
                
            })
        }
        
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
                $state.go("login");
            } else {
            // check if user object exists else fetch it. This is incase of a page refresh
            if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
            if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
            }
        });
  
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider,$httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'SignupCtrl'
            })

            .state('forgotPassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html',
                controller: 'ForgotPasswordCtrl'
            })
            
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller:  'HomeCtrl'
                    }
                }
            })

            .state('app.venuelist', {
                url: '/venuelist',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/venuelist.html',
                        controller:  'VenulistCtrl'
                    }
                }
            })
            .state('app.venueselected', {
                url: '/venueselected',
                params:{
                  location:null  
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/venue-selected.html',
                        controller:  'VenueSelectedCtrl'
                    }
                }
            })
            .state('app.menu', {
                url: '/menu',
                params:{
                  location:null  
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tab-menu.html',
                        controller:  'MenuCtrl'
                    }
                }
            })
            .state('app.history', {
                url: '/history',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/history.html',
                        controller:  'HistoryCtrl'
                    }
                }
            })
            .state('app.oldtab', {
                url: '/oldtab',
                params:{
                    tabId:null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/oldtab.html',
                        controller:  'OldtabCtrl'
                    }
                }
            })
            .state('app.payments', {
                url: '/payments',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/payments.html',
                        controller:  'PaymentsCtrl'
                    }
                }
            })
            .state('app.menuitem', {
                url: '/menuitem',
                params:{
                    item:null,
                    location:null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/menuitem.html',
                        controller:  'MenuitemCtrl'
                    }
                }
            })
            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })

            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    })

.filter('stripZip', function() {

  // Create the return function
  // set the required parameter name to **number**
  return function(address) {
      
    address = address.trim();
    var zip = address.substr(address.length - 5); 
    // Ensure that the passed in data is a number
    if(isNaN(zip) || zip < 1) {

      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return address;

    } else {

     var address = address.replace(zip, "");
     return address;

    }
  }
});