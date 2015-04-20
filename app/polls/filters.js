/**
 * Created by roberto on 4/8/15.
 */
'use strict';

/**
 * Filter that returns a "friendlier" version of a user's name
 */
angular.module('rpAngularModule')
.filter('pollUser', function() {
    return function(userId) {
        if (/anonymous/.test(userId)) {
            return 'guest';
        }
        if (/google/.test(userId)) {
            return 'google';
        }
    };
})

/**
 * Returns the choice name from its ID.  We need this because the
 * poll results only stores choice IDs and not choice names.
 *
 * @param int choiceId
 * @param array of choices
 * @returns string choice name
 */
.filter('choiceName', function() {
    return function(choiceId, choices) {
        var items = [];
        choices.forEach(function (value, index) {
            if (index == choiceId) {
                this.push(value);
            }
        }, items);
        return items.length > 0 ? items[0] : 'choice ' + choiceId;
    };
})

/**
 * Return the name of a poll from its id.
 * Need to do this since the history stores the poll ID and
 * not the poll name.
 *
 * @param id
 * @param polls
 * @returns string
 */
.filter('pollName', function() {
    return function(pollId, polls) {
        var items = [];
        angular.forEach(polls, function (item) {
            if (item.id == pollId) {
                this.push(item.name);
            }
        }, items);
        return items.length ? items[0] : 'unknown question';
    };
});
