var test_app = angular.module('test_app', ['ngRoute', 'FBAngular', 'lumx']);

test_app.config([ '$routeProvider', '$locationProvider', function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
            .when('/', {
                templateUrl: 'angular/test/test.html',
                controller: 'testController'
            })
            .when('/test', {
                templateUrl: 'angular/test/test.html',
                controller: 'testController'
            })
}]);




