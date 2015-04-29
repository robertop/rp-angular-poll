/**
 * Created by roberto on 4/10/15.
 */
'use strict';

/**
 * a directive to show the "sign out" button on multiple pages.
 * The directive will handle the click event.
 */
angular.module('rpAngularModule')
.directive('rpLogout', ['$state', 'Auth', function($state, Auth) {
    return {
        restrict: 'E',
        scope: {
            userName: '@userName'
        },
        link: function(scope/* , element, attr*/) {
            scope.onLogoutClick = function() {
                Auth.$unauth();
                $state.go('login');
            };
        },
        templateUrl: 'directives/logout.html'
    };
}]);