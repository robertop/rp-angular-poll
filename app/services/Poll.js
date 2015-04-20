/**
 * Created by roberto on 4/7/15.
 */
'use strict';

/**
 * This is a poll service that contains two methods
 *
 * fetch: to get a single poll and its choices
 * getAll: to get a tally of all of the responses to the poll
 */
angular.module('rpAngularModule.services')
.factory('Poll', ['$firebaseObject', '$firebaseArray', '$q', 'ProjectFirebase',
        function($firebaseObject, $firebaseArray, $q, ProjectFirebase) {

    return {

        /**
         * Fetch a single poll question from firebase.
         *
         * @param pollId the poll to query
         * @returns Promise that resolves to the poll
         */
        fetch: function (pollId) {
            var fb = new Firebase(ProjectFirebase.host);
            return $firebaseObject(fb.child('polls').child(pollId));
        },

        /**
         * Fetch all of the polls from firebase
         * @returns Promise that resolves to an array of all polls
         */
        getAll: function() {
            var fb = new Firebase(ProjectFirebase.host + '/polls');
            return $firebaseArray(fb);
        }
    };
}]);