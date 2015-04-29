/**
 * Created by roberto on 4/7/15.
 */
'use strict';

angular.module('rpAngularModule')
.run(['$rootScope', '$state', function($rootScope, $state) {

    /**
     * handle routing errors due to $requireAuth() failing
     * this means that the user has not logged in yet
     */
    $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('login');
        }
    });
}]);