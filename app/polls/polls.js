/**
 * Created by roberto on 4/6/15.
 */
'use strict';

/**
 * Shows the user a list of all available polls.
 * Also shows the user a stream of all users that
 * have responded to a poll.
 */
angular.module('rpAngularModule')
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('logged-in.polls', {
        url: '/polls',
        controller: 'PollsController',
        templateUrl: 'polls/polls.html',
        resolve: {
            CurrentUser: ['Auth', function (Auth) {
                return Auth.$requireAuth();
            }]
        }
    });
}]).controller('PollsController', ['$scope', '$location', '$mdToast', 'Poll', 'CurrentUser', 'Auth', 'PollHistory',
        function($scope, $location, $mdToast, Poll, CurrentUser, Auth, PollHistory) {
    $scope.polls = Poll.getAll();
    $scope.pollHistory = PollHistory.getAll();

    /**
     * show a "toaster" to the user when we see a new
     * reponse from (a different) client.
     */
    $scope.pollHistory.$loaded().then(function() {
        $scope.pollHistory.$watch(function() {
            $mdToast.show(
                $mdToast.simple()
                    .content('New responses!')
                    .hideDelay(3000)
            );
        });
    });
}]);
