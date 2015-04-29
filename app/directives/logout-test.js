/**
 * Created by roberto on 4/10/15.
 */

'use strict';

describe('logout directive test', function() {

    /**
     * the scope for the directive being tested
     */
    var $scope;

    /**
     * the state (ui router state), used by the directive
     * to redirect the user to the login page.
     */
    var $state;

    /**
     * the root DOM element of the compiled directive, used
     * so that we can simulate clicks
     */
    var element;

    /**
     * stub of the Auth service, done so that we can assert
     * that the directive calls its methods
     */
    var Auth;

    /**
     * before each test, create a stub for the Auth service
     * that will listen for calls to the logout method ($unauth)
     */
    beforeEach(module('rpAngularModule', function($provide) {
        Auth = jasmine.createSpyObj('Auth', ['$unauth']);
        $state = jasmine.createSpyObj('$state', ['go']);
        $provide.value('$state', $state);
        $provide.value('Auth', Auth);
    }));


    beforeEach(module('rpAngularModuleTemplates'));

    /**
     * at the start of each test, compile the directive into HTML
     */
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();
        element = $compile('<rp-logout user-name="john user"></rp-logout>')($scope);
        $scope.$digest();
    }));

    it('should have a logout link', function() {
        expect(element.html()).toContain('<a');
    });

    it('should have the user name', function() {
        expect(element.html()).toContain('john user');
    });

    it('should log the user out', function() {
        var a = element.find('a');
        a[0].click();

        expect(Auth.$unauth).toHaveBeenCalled();
    });
});

