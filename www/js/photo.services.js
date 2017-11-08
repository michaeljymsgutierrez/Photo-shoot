'use strict';

/*
    Photo Services
*/


/*
    Service for DBAccess
*/
app.service('DBAccess', function($q) {
    this.execute = function(query, param) {
        var d = $q.defer();
        db.transaction(function(tx) {
            tx.executeSql(query, param, function(tx, res) {
                d.resolve(res);
            }, function(tx, err) {
                d.reject(err);
            });
        });
        return d.promise;
    };
});