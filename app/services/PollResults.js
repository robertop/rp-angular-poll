/**
 * Created by roberto on 4/9/15.
 */
'use strict';

/**
 * This is a PollResults service that contains two methods
 *
 * fetch: to get the tallies for a single poll (the counts
 *        for each choice)
 * record: to save a user's selection. Only records a running
 * tally (a count of the choices, not who made the choice).
 */
angular.module('rpAngularModule.services')
.factory('PollResults', ['$q', '$firebaseObject', 'ProjectFirebase', function($q, $firebaseObject, ProjectFirebase) {
    var result = {

        /**
         * Fetch the poll results; tallies of how many times a choice
         * has been selected
         *
         * @param pollId
         * @return Promise that resolves to the poll results for the
         *         given poll
         **/
        fetch: function(pollId) {
            var ref = new Firebase(ProjectFirebase.host);
            return $firebaseObject(ref.child('pollResults').child(pollId));
        },

        /**
         * record that a poll choice has been made.
         *
         * @param pollId the poll that was filled in
         * @param choiceId the choice that was made
         * @return Promise that resolves when the choice has been
         *         recorded in firebase
         */
        record: function(pollId, choiceId) {
            return $q(function (resolve) {
                var ref = new Firebase(ProjectFirebase.host);
                var resultRef = ref.child('pollResults').child(pollId);
                resultRef.once('value', function (value) {
                    var counter = {};
                    if (value.val() === null) {

                        // insert a new counter
                        counter[choiceId] = 1;
                        resultRef.set(counter, function() {
                            resolve();
                        });
                    }
                    else {

                        // get the count of the choice
                        var counterRef = resultRef.child(choiceId);
                        counterRef.once('value', function(counterValue) {
                            if (counterValue.val() === null) {
                                counter[choiceId] = 1;
                            }
                            else {
                                counter[choiceId] = parseInt(counterValue.val()) + 1;
                            }
                            // update the counter
                            resultRef.update(counter, function() {
                                resolve();
                            });
                        });
                    }
                });
            });
        }
    };
    return result;
}]);