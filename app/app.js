/**
 * Created by roberto on 4/6/15.
 */
'use strict';

angular.module('rpAngularModule.services', [
    'firebase'
]);

angular.module('rpAngularModule', [
    'firebase',
    'ngRoute',
    'ngMaterial',
    'rpAngularModule.services'
]).config(['$routeProvider', '$provide', function($routeProvider, $provide) {
    $routeProvider.otherwise({
        'redirectTo': '/login'
    });
    $provide.factory('ProjectFirebase', function() {
       return {
           'host': 'https://blazing-torch-9122.firebaseio.com/'
       };
    });
}]);