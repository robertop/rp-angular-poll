/**
 * Created by roberto on 4/29/15.
 */
'use strict';

/**
 * the logged in layout provides the wrapper around that goes around
 * all pages that require the user to be
 */
angular.module('rpAngularModule')
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('logged-in', {
        templateUrl: 'layouts/logged-in.html',

        // wait for the UserName service promise to complete
        resolve: {
            UserName: 'UserName'
        },
        controller: 'LoggedInController'
    });
}]).controller('LoggedInController', ['$scope', 'UserName', function($scope, UserName) {
    $scope.userName = UserName;
}]);