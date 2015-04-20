/**
 * Created by roberto on 4/7/15.
 */
'use strict';

/**
 * controller that shows the user a single poll to make a choice.
 * Once the user makes a choice, redirect them back to
 * the polls page.
 *
 * Also, shows the user the up-to-date tallies of all
 * previous responses to the current poll.
 */
angular.module('rpAngularModule')
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/poll/:id', {
        controller: 'PollController',
        templateUrl: 'polls/poll.html',
        resolve: {
            CurrentUser: ['Auth', function(Auth) {
                return Auth.$requireAuth();
            }]
        }
    });
}]).controller('PollController',
        ['$scope', '$routeParams', '$location', '$q', 'CurrentUser', 'Poll', 'PollHistory', 'PollResults',
        function($scope, $routeParams, $location, $q, CurrentUser, Poll, PollHistory, PollResults) {

    $scope.selected = '-1';
    $scope.userName = '';
    $scope.pollResults = {};

    /**
     * Once we fetch a poll, fetch the previous results for this poll also.
     */
    var pollPromise = Poll.fetch($routeParams.id).$loaded().then(function(obj) {
        $scope.poll = obj;
    });
    pollPromise.then(function() {
        PollResults.fetch($routeParams.id).$loaded().then(function(results) {
            $scope.pollResults = results;
        });
    });

    /**
     * When the user makes a choice, record the history and the tallies
     * for this poll.
     */
    $scope.onPollChoiceSelected = function() {
        PollResults.record($routeParams.id, $scope.selected).then(function() {
            PollHistory.record(CurrentUser.uid, $routeParams.id, $scope.selected).then(function () {
                $location.url('/polls');
            });
        });
    };

    if (CurrentUser.provider === 'anonymous') {
        $scope.userName = 'Guest';
    }
    else if (CurrentUser.provider === 'google') {
        $scope.userName = CurrentUser.google.displayName;
    }

}]);