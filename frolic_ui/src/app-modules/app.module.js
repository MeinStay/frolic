(function() {
    'use strict';
    var appModule = angular.module("frolicApp.app", []);
    appModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url: '/',
            templateUrl: './app-modules/homepage-module/views/homepage.html',
            controller: 'homePageController',
            controllerAs: 'homePageCtrl'
        });
        $stateProvider.state('addItem', {
            url: '/add_item',
            templateUrl: './app-modules/create-item-module/views/create-item.html',
            controller: 'createController',
            controllerAs: 'createCtrl'
        });
        $stateProvider.state('deleteItem', {
            url: '/delete_item',
            templateUrl: './app-modules/delete-item-module/views/delete-item.html',
            controller: 'deleteController',
            controllerAs: 'deleteCtrl'
        });
        $stateProvider.state('editItem', {
            url: '/edit_item',
            templateUrl: './app-modules/edit-item-module/views/edit-item.html',
            controller: 'editController',
            controllerAs: 'editCtrl'
        });
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: './app-modules/login-module/views/login.html',
            controller: 'loginController',
            controllerAs: 'loginCtrl'
        });
        $stateProvider.state('register', {
            url: '/register',
            templateUrl: './app-modules/register-module/views/register.html',
            controller: 'registerController',
            controllerAs: 'registerCtrl'
        });
        $stateProvider.state('viewDetails', {
            url: '/view_details',
            templateUrl: './app-modules/view-details-module/views/view-details.html',
            controller: 'viewController',
            controllerAs: 'viewCtrl'
        });
    }]);
})();