(function() {
    'use strict';
    angular.module("frolicApp.app").controller("loginController", ["loginService", "$rootScope", "$window", "$state", function(loginService, $rootScope, $window, $state) {
        var self = this;
        $rootScope.showCategoryLink = false;
        self.responseMessage = "";
        self.responseCode = null;
        self.auth2 = null;

        function init() {
            self.onLoad();
        }

        self.loginUser = function(user) {
            self.isDisabled = true;
            loginService.validateUser(user).then(function(response) {
                self.isDisabled = false;
                self.processResponse(response);
            });
        };

        self.onLoad = function() {
            $window.gapi.load('auth2,signin2', function() {
                self.auth2 = gapi.auth2.init();
                gapi.signin2.render('google-signin-button');
            });
        };
        self.signIn = function() {
            self.auth2.grantOfflineAccess().then(self.onSignIn);
        }
        self.onSignIn = function(googleUser) {
            loginService.verifyGoogleSignin(googleUser['code']).then(function(response) {
                self.processResponse(response);
            });
        };
        self.processResponse = function(response) {
            if (angular.isDefined(response)) {
                self.responseMessage = response.message;
                self.responseCode = response.code;
                if (response.is_authentic) {
                    localStorage.setItem("isAuthentic", response.is_authentic);
                    localStorage.setItem("username", response.username);
                    $window.location.href = "/";
                }
            } else {
                self.responseMessage = "Some unexpected error occurred";
                self.responseCode = "7864";
            }
        };
        init();
    }]);
})();