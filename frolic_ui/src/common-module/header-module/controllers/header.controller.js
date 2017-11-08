(function() {
    'use strict';
    angular.module("frolicApp.common").controller("headerController", ["$window", "$rootScope", function($window, $rootScope) {

        var self = this;
        $rootScope.showCategoryLink = null;
        self.showMenu = null;
        self.showLogoutLink = false;

        /*
        @name init
        @params none
        @description initialize header controller
        */
        function init() {
            self.checkWidth();
            self.isAuthentic();
        }

        /*
        @name isAuthentic
        @params none
        @description check whether request is authentic
        */
        self.isAuthentic = function() {
            if (localStorage.getItem("isAuthentic")) {
                self.showLogoutLink = true;
            }
        }

        /*
        @name checkWidth
        @params none
        @description check width of screen
        */
        self.checkWidth = function() {
            if ($window.innerWidth < 768) {
                self.showMenu = true;
            } else {
                self.showMenu = false;
            }
        }

        /*
        @name logout
        @params none
        @description logout the session of user
        */
        self.logout = function() {
            if (localStorage.getItem("isAuthentic")) {
                localStorage.clear();
                $window.location.href = "/";
            }
        }
        init();
    }]);
})();