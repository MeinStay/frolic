(function() {
    'use strict';
    angular.module("frolicApp.app").controller("editController", ["$rootScope", "$location", "$window", "homePageService", "editService", "viewService", "$state", "createService", function($rootScope, $location, $window, homePageService, editService, viewService, $state, createService) {
        var self = this;
        self.categories = [];
        self.items = [];
        self.responseMessage = "";
        self.responseCode = "";
        self.itemId = $location.search().q;
        $rootScope.showCategoryLink = false;
        self.itemDetails = {};

        /*
        @name init
        @params none
        @description initializes the controller
        */
        function init() {
            self.getCategories();
            self.getItemDetails(self.itemId);
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
        @name getCategories
        @params none
        @description gets all the categories
        */
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

        /*
        @name getItemDetails
        @params none
        @description gets all the items by id
        */
        self.getItemDetails = function(itemId) {
            viewService.getItemDetails(itemId).then(function(data) {
                if (angular.isDefined(data)) {
                    self.itemDetails = data.items;
                } else {
                    self.responseMessage = "Some unexpected error occurred";
                    self.responseCode = "7864";
                }
            });
        };

        /*
        @name updateItem
        @params none
        @description updates all the item's data
        */
        self.updateItem = function(item) {
            self.itemData = item;
            self.itemData.pictureName = self.picFileName;
            self.itemData.username = localStorage.getItem("username");
            editService.updateItem(self.itemData).then(function(response) {
                if (angular.isDefined(response)) {
                    self.responseMessage = response.message;
                    self.responseCode = response.code;
                } else {
                    self.responseMessage = "Some unexpected error occurred";
                    self.responseCode = "7864";
                }
            });
        };

        /*
        @name uploadPic
        @params file
        @description uploads image of item
        */
        self.uploadPic = function(file) {
            self.picFileName = file.name;
            createService.uploadPic(file).then(function(response) {
                if (angular.isDefined(response)) {
                    self.uploadPicResponse = response.data.message;
                    self.uploadPicResponseCode = response.data.code;
                } else {
                    self.responseMessage = "Some unexpected error occurred";
                    self.responseCode = "7864";
                }
            });
        };
        init();
    }]);
})();