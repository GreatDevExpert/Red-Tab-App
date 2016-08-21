redtab.controllers.controller('VenueSelectedCtrl', function($scope, $stateParams,$state,$ionicPopup,$cordovaGeolocation,$http,App) {
     $scope.init = function(){
        $scope.location = $stateParams.location;
        $http.get(App.baseUrl+'locations').success(function(response){
            if(response.success){
                 $scope.locations = response.data;
                 
                    var options = {timeout: 10000, enableHighAccuracy: true};
            
                    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
                    
                        //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        var latLng = new google.maps.LatLng(34.076354, 74.811446);
                            initMap(latLng);
                    }, function(error){
                        var latLng = new google.maps.LatLng(34.076354, 74.811446);
                            initMap(latLng);
                    });
            }
        });
    };
    
     //map initialize function
    var initMap = function(latLng){
        
         var mapOptions = {
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        
    var bounds = new google.maps.LatLngBounds();

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("venue-map"), mapOptions);
    if (geocoder) {

        // Display multiple markers on a map
        var i = 0;
        var counter = 0;
        $scope.center = '';
        angular.forEach($scope.locations,function(value){
            
            geocoder.geocode({
                'address': value.address
            }, function (results, status) {
                
                if (status == google.maps.GeocoderStatus.OK) {
                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                        var center = '';

                       // var iwContent = infoWindowContent[counter];
                        if($scope.location._id == value._id){
                            var marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map,
                                title: value.address,
                                icon:'img/icons/ic_marker_green.png'
                            });
                             $ionicPopup.alert({content:$scope.center})
                        }else{
                            var marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map,
                                title: value.address,
                                icon:'img/icons/ic_marker_blue.png'
                            });;
                        }
                        
                        google.maps.event.addListener(marker, 'click', function () {
                              $state.go("app.venueselected",{location:value} );
                        });

                        counter++;
                        
                  // Automatically center the map fitting all markers on the screen
                       bounds.extend(results[0].geometry.location);
                      map.fitBounds(bounds);
                      
                     
                    }
                }
                if($scope.locations.length-1 ==  i){
                    $scope.updateMap();
                }
                i++;
            });
        });
     
    }
    
       // map.panTo(center);
    }
     $scope.updateMap = function(){
            var options = {
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        map.setOptions(options);
       map.panTo($scope.center);
        //console.log(JSON.stringify($scope.center));
                             //$ionicPopup.alert({content:$scope.center})
     }
    $scope.goToHome = function(){
        $state.go("app.home");
    };
    $scope.goToMenu = function(location){
        $state.go("app.menu",{location:location});
    };
    $scope.radTab = function(location){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm',
            template: "Are you sure you  want to start a tab at '" + location.name + "' ?"
        });

        confirmPopup.then(function(res) {
            if(res) {
                $state.go("app.menu",{location:location});
            } else {
            console.log('You are not sure');
            }
        });
    };
    $scope.init();
});