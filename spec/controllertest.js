'use strict';

describe('dictionaryGame', function() {
  beforeEach(module('dictionaryGame'));

  describe('MainCtrl', function() {
    var $rootScope;
    var $scope;
    beforeEach(function() {
      inject(function(_$rootScope_, $controller) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller('MainCtrl', { $scope: $scope });
      });
    });

    it('should check the existence of the scope', function() {
      expect($scope).toBeDefined();
    });

    it('should test a scope property', function() {
      expect($scope.word.length).toEqual(0);
    });
  });
});
