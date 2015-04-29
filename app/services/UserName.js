/**
 * Created by roberto on 4/28/15.
 */
'use strict';

/**
 * This service determines the logged in user's name based on
 * the Auth service.
 */
angular.module('rpAngularModule.services')
.factory('UserName', ['Auth', function(Auth) {
    return Auth.$waitForAuth().then(function(user) {
        if (user.provider === 'anonymous') {
            return 'Guest';
        }
        else if (user.provider === 'google') {
            return user.google.displayName;
        }
    });
}]);