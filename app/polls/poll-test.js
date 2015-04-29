/**
 * Created by roberto on 4/14/15.
 */

'use strict';

describe('poll test', function() {

    /**
     * Spy that stubs out all authentication API calls
     * to firebase
     */
    var Auth;

    /**
     * The controller under test
     */
    var $controller;

    /**
     * Stub the state service, so that we test that the user
     * is redirected to the polls page after they selected
     * a choice
     */
    var $state;

    /**
     * the root scope of the app, needed to execute
     * the angular run loop that is require by the test
     * promises
     */
    var $rootScope;

    /**
     * promises used in testing; stub out the API calls to
     * the firebase API.
     */
    var authDeferred;
    var pollDeferred;
    var resultsDeferred;

    // mock the services so that we don't depend
    // on firebase
    var Poll;
    var PollResults;

    beforeEach(module('rpAngularModule', function($provide) {
        Auth = jasmine.createSpyObj('Auth', ['$requireAuth']);
        Poll = jasmine.createSpyObj('Poll', ['fetch']);
        PollResults = jasmine.createSpyObj('PollResults', ['fetch']);
        $state = jasmine.createSpyObj('$state', ['go']);

        // instead of using the default services, use our spies
        $provide.value('Auth', Auth);
        $provide.value('CurrentUser', { provider: 'anonymous'});
        $provide.value('Poll', Poll);
        $provide.value('PollResults', PollResults);
        $provide.value('$state', $state);
    }));

    beforeEach(inject(function(_$controller_, _$rootScope_, $q) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;

        authDeferred = $q.defer();
        pollDeferred = $q.defer();
        resultsDeferred = $q.defer();

        // The poll service fetch method returns an object that
        // has a method that returns a promise
        Poll.fetch.and.returnValue({
            $loaded: function () {
                return pollDeferred.promise;
            }
        });
        Auth.$requireAuth.and.returnValue(authDeferred.promise);
        PollResults.fetch.and.returnValue({
            $loaded: function() {
                return resultsDeferred.promise;
            }
        });
    }));

    it('should set poll and results', function() {
        var $scope = {};
        var $stateParams = { id: 3 };

        var testPoll = {
            pollId: 3,
            name: 'a test poll',
            choices: {
                1: 'choice 1',
                2: 'choice 2',
                3: 'choice 3'
            }
        };
        var testPollResults = {
            1: 0,
            2: 10,
            3: 35
        };

        $controller('PollController', { $scope: $scope, $stateParams: $stateParams });

        authDeferred.resolve();
        pollDeferred.resolve(testPoll);
        resultsDeferred.resolve(testPollResults);
        $rootScope.$apply();

        expect(testPoll).toBe($scope.poll);
        expect(testPollResults).toBe($scope.pollResults);
    });
});