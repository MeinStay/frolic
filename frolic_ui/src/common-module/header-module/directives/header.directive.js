(function() {
    'use strict';
    angular.module("frolicApp.common").directive("headerDirective", ["$location", function($location) {
        return {
            restrict: "E",
            templateUrl: "./common-module/header-module/views/header.html",
            controller: "headerController",
            controllerAs: "headerCtrl",
            scope: {
                showSidebar: "=showSidebar",
                showCategoryLink: "=showCategoryLink"
            },
            link: function(elem, attr, scope) {
                //TODO for future 
            }
        };
    }]);
})();