(function() {
    'use strict';
    var frolicApp = angular.module("frolicApp", ["ui.router",
        "ngSanitize",
        "ngFileUpload",
        "ngStorage",
        "frolicApp.common",
        "frolicApp.app"
    ]);
    frolicApp.config(['$sceDelegateProvider', 'ENDPOINT_CONSTANTS', function($sceDelegateProvider, ENDPOINT_CONSTANTS) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            ENDPOINT_CONSTANTS.API_DOMAIN
        ]);
    }]);
    frolicApp.constant('ENDPOINT_CONSTANTS', {
        API_DOMAIN: "http://localhost:5000/",
        IMAGE_URL: "uploads"
    });
})();