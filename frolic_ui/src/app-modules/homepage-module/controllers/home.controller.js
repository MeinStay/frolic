(function() {
    'use strict';
    angular.module("frolicApp.app").controller("homePageController", ["homePageService", "$rootScope", "$window", "ENDPOINT_CONSTANTS", "$localStorage", function(homePageService, $rootScope, $window, ENDPOINT_CONSTANTS, $localStorage) {
        var self = this;
        self.categories = [];
        self.items = [];
        self.responseMessage = "";
        self.responseCode = "";
        self.selected = null;
        self.filters = {
            catId: "",
            catName: "All"
        };
        $rootScope.showSidebar = null;
        $rootScope.showCategoryLink = true;
        self.imageUrl = ENDPOINT_CONSTANTS.API_DOMAIN + ENDPOINT_CONSTANTS.IMAGE_URL;

        function init() {
            self.getCategories();
            self.getItems();
            self.checkScreenWidth();
        };
        self.checkScreenWidth = function() {
            if ($window.innerWidth < 767) {
                $rootScope.showSidebar = false;
            } else {
                $rootScope.showSidebar = true;
            }
        };
        self.getCategories = function() {
            homePageService.getCategories().then(function(data) {
                if (angular.isDefined(data)) {
                    self.categories = data.categories;
                } else {
                    self.responseMessage = "Some unexpected error occurred";
                    self.responseCode = "7864";
                }
            });
        };
        self.getItems = function() {
            homePageService.getItems().then(function(data) {
                if (angular.isDefined(data)) {
                    self.items = data.items;
                } else {
                    self.responseMessage = "Some unexpected error occurred";
                    self.responseCode = "7864";
                }
            });
        };
        self.getItemsByCategory = function(category_id, $index) {
            self.checkScreenWidth();
            homePageService.getItemsByCategory(category_id).then(function(data) {
                if (angular.isDefined(data)) {
                    self.items = data.items;
                } else {
                    self.responseMessage = "Some unexpected error occurred";
                    self.responseCode = "7864";
                }
            });
            self.selected = $index;
        };
        init();
    }]);
})();