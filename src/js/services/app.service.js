redtab.services.factory('App', function($rootScope) {
  // Might use a resource here that returns a JSON array

 

  return {
    baseUrl:'http://admin.radtab.co/api/v1/',
    showLoading:function(){
        $rootScope.showLoading = true
    },
    hideLoading:function(){
        $rootScope.showLoading = false
    }
  };
});