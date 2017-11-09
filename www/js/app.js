'use strict';

/*
  Photoshoot module
*/
var app = angular.module('photoshoot', ['ionic', 'ionic.native']);
var db = null;


app.run(function($ionicPlatform, DBAccess) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        db = window.sqlitePlugin.openDatabase({ name: 'photoshoot.db', location: 'default' });

        DBAccess.execute("CREATE TABLE IF NOT EXISTS photo (id integer primary key, filename longtext, image longtext, created datetime)", []);

    });
});