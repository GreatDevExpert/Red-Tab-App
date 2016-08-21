redtab.controllers.controller('HomeCtrl', function($scope, $stateParams,$state,$cordovaGeolocation,$http,App) {
    $scope.init = function(){
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
        
       
    }
    //map initialize function
    var initMap = function(latLng){
        
        var mapOptions = {
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
    var bounds = new google.maps.LatLngBounds();

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("home-map"), mapOptions);

    if (geocoder) {

        // Display multiple markers on a map
        var counter = 0;
        angular.forEach($scope.locations,function(value){
            
            geocoder.geocode({
                'address': value.address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {

                       // var iwContent = infoWindowContent[counter];
                        
                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            title: value.address,
                            icon:'img/icons/ic_marker_blue.png'
                        });

                        google.maps.event.addListener(marker, 'click', function () {
                              $state.go("app.venueselected",{location:value} );
                        });

                        counter++;

                        // Automatically center the map fitting all markers on the screen
                        bounds.extend(results[0].geometry.location);
                        map.fitBounds(bounds);
                    }
                }
            });
        });
    }

    }
    $scope.goToVenueList = function(){
        $state.go("app.venuelist");
    }
    $scope.selectVenue = function(id){
        $state.go("app.venueselected",{venueId:id})
    }
    $scope.init();
});
