'use strict';

/*
    Photoshoot Controller
*/
app.controller('photoCtrl', ['$scope', '$ionicPlatform', '$cordovaCamera', 'DBAccess', function($scope, $ionicPlatform, $cordovaCamera, DBAccess) {

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
            var query = "SELECT * FROM photo"
            var param = [];
            DBAccess.execute(query, param).then(function(res) {
                var len = res.rows.length;
                var query = len == 0 ? "INSERT INTO photo (filename, image, created) VALUES (?,?,?)" : "UPDATE photo SET filename = ?, image = ? , created = ?";
                var param = [filename, image, created];
                DBAccess.execute(query, param).then(function(res) {
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });
            }, function(err) {
                console.log(err);
            });
        }, function(err) {
            console.log(err);
        });
    });

}]);