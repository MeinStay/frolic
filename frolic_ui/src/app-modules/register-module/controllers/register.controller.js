(function() {
    'use strict';
    angular.module("frolicApp.app").controller("registerController", ["registerService", "$rootScope", "$window", function(registerService, $rootScope, $window) {
        var self = this;
        self.responseMessage = "";
        self.responseCode = null;
        $rootScope.showCategoryLink = false;
        self.registerUser = function(user) {
            registerService.createUser(user).then(function(response) {
                if (angular.isDefined(response)) {
                    self.responseMessage = response.message;
                    self.responseCode = response.code;
                } else {
                    self.responseMessage = "Some unexpected error occurred";
                    self.responseCode = "7864";
                }
            });
        };
    }]);
})();