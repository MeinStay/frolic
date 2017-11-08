(function() {
    'use strict';
    angular.module("frolicApp.app").controller("deleteController", ["$window", "$location", "$rootScope", "deleteService", "$state", function($window, $location, $rootScope, deleteService, $state) {
        var self = this;
        self.itemId = $location.search().q;
        $rootScope.showCategoryLink = false;
        self.showForm = true;

        /*
        @name init
        @params none
        @description initialize delete controller
        */
        function init() {
            self.isAuthentic();
        }

        /*
        @name isAuthentic
        @params none
        @description check whether request is authentic
        */
        self.isAuthentic = function() {
            if (!localStorage.getItem("isAuthentic")) {
                $state.go('login');
            }
        }

        /*
        @name deleteItem
        @params none
        @description delete all item's data
        */
        self.deleteItem = function(itemId) {
            var details = {
                username: localStorage.getItem("username"),
                itemId: itemId
            };
            deleteService.deleteItem(details).then(function(response) {
                if (angular.isDefined(response)) {
                    self.responseMessage = response.message;
                    self.responseCode = response.code;
                    if (self.responseCode === "0000") {
                        self.showForm = false;
                    }
                } else {
                    self.responseMessage = "Some unexpected error occurred";
                    self.responseCode = "7864";
                }
            });
        };

        /*
        @name goBack
        @params none
        @description go back to previous screen
        */
        self.goBack = function() {
            $window.history.back();
        }
        init();
    }]);
})();