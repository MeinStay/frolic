(function() {
    'use strict';
    angular.module("frolicApp.app").service("deleteService", ["$http", "ENDPOINT_CONSTANTS", function($http, ENDPOINT_CONSTANTS) {
        var self = this;

        /*
        @name createItem
        @params itemData
        @description creates items
        */
        self.deleteItem = function(details) {
            return $http.post(ENDPOINT_CONSTANTS.API_DOMAIN + "items/delete", details)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(response) {
                    console.error("data error", response.message);
                })
                .finally(function() {
                    console.log("finally finished data");
                });
        };
    }]);
})();