/**
 * Created by roberto on 4/14/15.
 */
'use strict';

describe('login test', function() {

    /**
     * the controller being tested
     */
    var $controller;

    /**
     * Stub the state service, so that we test that the user
     * is redirected to the proper routes after successful
     * login
     */
    var $state;

    /**
     * Stub the location service, so that we test that the user
     * is redirected to the proper routes during login errors
     */
    var $location;

    /**
     * the scope that the controller under test uses
     */
    var $rootScope;

    /**
     * Stub for the authentication service to stub out the
     * methods that actually authenticate with the firebase API
     */
    var Auth;

    /**
     * Stub promise that is used to ensure that the controller
     * changes routes.
     */
    var deferred;

    beforeEach(module('rpAngularModule', function($provide) {
        $location = jasmine.createSpyObj('location', ['url']);
        $provide.value('$location', $location);
        $state = jasmine.createSpyObj('$state', ['go']);
        $provide.value('$state', $state);
        Auth = jasmine.createSpyObj('Auth', ['$authWithOAuthPopup', '$authAnonymously']);
        $provide.value('Auth', Auth);
    }));

    beforeEach(inject(function(_$controller_, $q, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;

        // stub the authentication methods with "empty promises"
        // the login controller expect that the auth methods return promises
        deferred = $q.defer();
        Auth.$authAnonymously.and.returnValue(deferred.promise);
        Auth.$authWithOAuthPopup.and.returnValue(deferred.promise);
    }));

    it('should allow user to sign in as anonymous', function() {
        var $scope = {};
        $controller('LoginController', { $scope: $scope });

        $scope.onAnonymousLogin();
        deferred.resolve();
        $rootScope.$digest();

        expect(Auth.$authAnonymously).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('logged-in.polls');
    });

    it('should allow user to sign in with google', function() {
        var $scope = {};
        $controller('LoginController', { $scope: $scope });

        $scope.onGoogleLogin();
        deferred.resolve();
        $rootScope.$digest();

        expect(Auth.$authWithOAuthPopup).toHaveBeenCalledWith('google');
        expect($state.go).toHaveBeenCalledWith('logged-in.polls');
    });
});