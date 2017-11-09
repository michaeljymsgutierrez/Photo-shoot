'use strict';

/*
    Photoshoot Controller
*/
app.controller('photoCtrl', ['$scope', '$ionicPlatform', '$cordovaCamera', '$cordovaFile', '$filter', function($scope, $ionicPlatform, $cordovaCamera, $cordovaFile, $filter) {

    /*
        Platform Ready Instance
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
            Take Photo
        */
        $cordovaCamera.getPicture(options).then(function(imageData) {
            var image = 'data:image/png;base64' + imageData;
            var filename = Math.floor(new Date().getTime() / 1000) + '.png';
            var created = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:00');
            var writeFile = {
                filename: filename,
                image: image,
                created: created
            };
            $cordovaFile.createFile(cordova.file.externalRootDirectory, "photoshoot.json", true).then(function(success) {
                $cordovaFile.writeFile(cordova.file.externalRootDirectory, "photoshoot.json", JSON.stringify(writeFile), true)
                    .then(function(success) {
                        var sApp = startApp.set({
                            "package": "com.vielsoft.mobilekiosk"
                        });
                        sApp.start(function() {
                            console.log("Successfully started");
                            navigator.app.exitApp();
                        }, function(error) {
                            console.log(error)
                        });
                    }, function(error) {
                        console.log(error);
                    });
            }, function(error) {
                console.log(error);
            });
        }, function(err) {
            console.log(err);
        });
    });
}]);