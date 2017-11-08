(function() {
    'use strict';
    angular.module("frolicApp.app").service("registerService", ["$http", "ENDPOINT_CONSTANTS", function($http, ENDPOINT_CONSTANTS) {
        var self = this;
        self.createUser = function(userData) {
            return $http.post(ENDPOINT_CONSTANTS.API_DOMAIN + "register", userData)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    console.error('data error', response.message);
                })
                .finally(function() {
                    console.log("finally finished data");
                });
        };
    }]);
})();