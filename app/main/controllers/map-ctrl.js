'use strict';
angular.module('main')
.controller('MapCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading) {

  var options = {timeout: 10000, enableHighAccuracy: true};

  // Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
 
  $cordovaGeolocation.getCurrentPosition(options).then(function (position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
    	center: latLng,
      	zoom: 15,
      	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $ionicLoading.hide();

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  		var marker = new google.maps.Marker({
	      	map: $scope.map,
	      	animation: google.maps.Animation.DROP,
	      	position: latLng
	  	});      
	 
	});
 
  }, function (error){
    console.log("Could not get location");
  });
});
