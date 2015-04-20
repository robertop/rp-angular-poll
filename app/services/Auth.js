/**
 * Created by roberto on 4/6/15.
 */
'use strict';

/**
 * The auth service returns a $firebaseAuth service instantiated
 * with the correct host name for our app's data.
 */
angular.module('rpAngularModule.services')
.factory('Auth', ['$firebaseAuth', 'ProjectFirebase', function($firebaseAuth, ProjectFirebase) {
    var ref = new Firebase(ProjectFirebase.host);
    return $firebaseAuth(ref);
}]);