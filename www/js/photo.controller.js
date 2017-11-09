'use strict';

/*
    Photoshoot Controller
*/
app.controller('photoCtrl', ['$scope', '$ionicPlatform', '$cordovaCamera', '$cordovaFile', '$http', function($scope, $ionicPlatform, $cordovaCamera, $cordovaFile, $http) {

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
            var image = 'data:image/png;base64' + imageData;
            var filename = Math.floor(new Date().getTime() / 1000) + '.png';
            var created = new Date();
            var writeFile = {
                filename: filename,
                image: image,
                created: created
            };
            $cordovaFile.createFile(cordova.file.externalRootDirectory, "data.json", true).then(function(success) {
                $cordovaFile.writeFile(cordova.file.externalRootDirectory, "data.json", JSON.stringify(writeFile), true)
                    .then(function(success) {
                        console.log(1);
                    }, function(error) {
                        console.log(0);
                    });
            }, function(error) {
                console.log(error);
            });
        }, function(err) {
            console.log(err);
        });
        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "data.json").then(function(success) {
            $scope.data = success;
        }, function(error) {
            $scope.data = error;
        });
    });
}]);