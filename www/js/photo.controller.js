'use strict';

/*
    Photoshoot Controller
*/
app.controller('photoCtrl', ['$scope', '$ionicPlatform', '$cordovaCamera', function($scope, $ionicPlatform, $cordovaCamera) {

    /*
        Platform Ready
    */
    $ionicPlatform.ready(function() {
        var options = {
            quality: 50,
            destinationType: 0,
            sourceType: 1,
            allowEdit: true,
            encodingType: 1,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        /*
            Get Picture
        */
        $cordovaCamera.getPicture(options).then(function(imageData) {
            console.log(imageData)
        }, function(err) {
            console.log(err);
        });
    });

}]);