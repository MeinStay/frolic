(function() {
    'use strict';
    angular.module("frolicApp.app").service("homePageService", ["$http", "ENDPOINT_CONSTANTS", function($http, ENDPOINT_CONSTANTS) {
        var self = this;
        self.getCategories = function() {
            var data = {};
            return $http.get(ENDPOINT_CONSTANTS.API_DOMAIN + "categories/all")
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
        self.getItems = function() {
            var data = {};
            return $http.get(ENDPOINT_CONSTANTS.API_DOMAIN + "items/all")
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
        self.getItemsByCategory = function(category_id) {
            var data = {};
            return $http.get(ENDPOINT_CONSTANTS.API_DOMAIN + "items/category/" + category_id)
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