/**
 * Created by roberto on 4/7/15.
 */
'use strict';


angular.module('rpAngularModule')
.run(['$rootScope', '$location', function($rootScope, $location) {

    /**
     * handle routing errors due to $requireAuth() failing
     * this means that the user has not logged in yet
     */
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
       if (error === 'AUTH_REQUIRED') {
           $location.path('/home');
       }
    });
}]);