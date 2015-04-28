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
        $provide.value('Auth', Auth);
    }));


    beforeEach(module('rpAngularModuleTemplates'));

    /**
     * at the start of each test, compile the directive into HTML
     */
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();

        $scope.userName = 'user john';
        element = $compile('<rp-logout userName="userName"></rp-logout>')($scope);
        $scope.$digest();
    }));

    it('should have a logout link', function() {
        expect(element.html()).toContain('<a');
    });

    it('should log the user out', function() {
        var a = element.find('a');
        a[0].click();

        expect(Auth.$unauth).toHaveBeenCalled();
    });
});

