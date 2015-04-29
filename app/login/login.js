/**
 * Created by roberto on 4/6/15.
 */
'use strict';

angular.module('rpAngularModule')
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'login/login.html'
    });
}]).controller('LoginController', ['$scope', '$state', '$location', 'Auth', function($scope, $state, $location, Auth) {

    /**
     * when a user clicks on the 'login with google' button
     * use firebase OAuth
     */
    $scope.onGoogleLogin = function() {
        Auth.$authWithOAuthPopup('google').then(function ( /* userData */) {
            $state.go('logged-in.polls');
        }).catch(function (/* error */) {
            $location.url('/error.html');
        });
    };

    /**
     * when a user clicks on the 'anonymous login' button
     * use firebase anonymous login
     */
    $scope.onAnonymousLogin = function() {
        Auth.$authAnonymously().then(function(/* userData */) {
            $state.go('logged-in.polls');
        }).catch(function(/* error */) {
            $location.url('/error.html');
        });
    };
}]);
