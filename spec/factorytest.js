describe('GameService factory', function() {
  var factory;
  beforeEach(function() {
    module('dictionaryGame');
    inject(function($injector) {
      factory = $injector.get('GameService');
    });
  });

  describe('dictionaryGame', function() {
    it('should exist', function() {
      expect(factory).toBeDefined();
    });
  });
});
