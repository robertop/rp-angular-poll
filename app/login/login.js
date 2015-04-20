/**
 * Created by roberto on 4/6/15.
 */
'use strict';

angular.module('rpAngularModule')
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        controller: 'LoginController',
        templateUrl: 'login/login.html'
    });
}]).controller('LoginController', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {

    /**
     * when a user clicks on the 'login with google' button
     * use firebase OAuth
     */
    $scope.onGoogleLogin = function() {
        Auth.$authWithOAuthPopup('google').then(function ( /* userData */) {
            $location.url('/polls');
        }).catch(function (/* error */) {
            $location.url('/error.html');
        });
    };

    /**
     * when a user clicks on the 'anonymous login' button
     * use firebase anonymous login
     */
    $scope.onAnonymousLogin = function() {
        debugger;
        Auth.$authAnonymously().then(function(/* userData */) {
            $location.url('/polls');
        }).catch(function(/* error */) {
            $location.url('/error.html');
        });
    };
}]);
