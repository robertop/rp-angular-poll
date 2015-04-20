/**
 * Created by roberto on 4/8/15.
 */
'use strict';

/**
 * This is a PollHistory service that contains two methods
 *
 * getAll: to get all of the responses that have been recorded so far
 * record: to save a user's selection.
 */
angular.module('rpAngularModule.services')
.factory('PollHistory', ['$q', '$firebaseArray', '$firebaseObject', 'ProjectFirebase',
        function($q, $firebaseArray, $firebaseObject, ProjectFirebase) {

    return {

        /**
         * Returns all of the responses that have been submitted
         * @returns Promise that resolves to all of the poll history
         */
        getAll: function () {
            var ref = new Firebase(ProjectFirebase.host + '/pollHistory');
            var arRef = $firebaseArray(ref);
            arRef.$watch(function() {
                arRef.sort(function(a, b) {
                    return a.date < b.date;
                });
            });
            return arRef;
        },

        /**
         * Saves the response that a user has given for a single poll
         * question.
         *
         * @param user
         * @param pollId
         * @param choiceId
         * @returns Promise that will be resolved when the save
         *          has completeds
         */
        record: function(user, pollId, choiceId) {
          return $q(function(resolve, reject) {
              var ref = new Firebase(ProjectFirebase.host);
              var historyRef = ref.child('pollHistory');
              historyRef.push({
                  'userId': user,
                  'pollId': pollId,
                  'choiceId': choiceId,
                  'date': new Date().getTime()
              }, function(error) {
                  if (error) {
                      reject(error);
                  }
                  else {
                      resolve();
                  }
              });
          });
      }
    };
}]);