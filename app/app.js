/**
 * Created by roberto on 4/6/15.
 */
'use strict';

angular.module('rpAngularModule.services', [
    'firebase'
]);

angular.module('rpAngularModule', [
    'firebase',
    'ui.router',
    'ngMaterial',
    'rpAngularModule.services'
]).config(['$urlRouterProvider', '$provide', function($urlRouterProvider, $provide) {
    $urlRouterProvider.otherwise('/login');

    $provide.factory('ProjectFirebase', function() {
       return {
           'host': 'https://blazing-torch-9122.firebaseio.com/'
       };
    });
}]);