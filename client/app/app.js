var dictionaryGame = angular.module('dictionaryGame', []);
var dictionary = new Typo("en_US", false, false, {dictionaryPath: "../node_modules/typo-js/dictionaries"});

dictionaryGame.factory('GameService', function() {
  return {
    checkWord: function(word) {
      return dictionary.check(word);
    },
    countUniqueLetters: function(word) {
      var uniqueLetters = new Set(word.split(''));
      return uniqueLetters.size;
    }
  };
});

dictionaryGame.controller('MainCtrl', function($scope, $timeout, GameService) {
  $scope.wordLength;
  $scope.word = '';
  $scope.highscores = localStorage.getItem['highscores'];
  $scope.alerts = [];
  $scope.addAlert = function(text) {
    $scope.alerts.push({msg: text});
    $timeout($scope.closeAlert, 2000);
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.checkProperty = function(element) {
    element.hasOwnProperty();
  };
  $scope.checkHighscores = function() {
    if ($scope.highscores) {
      console.info('exists');
    } else {
      $scope.highscores = [];
      localStorage.setItem('highscores', JSON.stringify($scope.highscores));
    }
  };
  $scope.getWord = function(word) {
    $scope.word = word;
    $scope.checkHighscores();
    if (GameService.checkWord(word)) {
      var size = GameService.countUniqueLetters(word);
      $scope.wordLength = size;
      if ($scope.highscores) {
        for (var i = 0; i < $scope.highscores.length; i++) {
          if ($scope.highscores[i].string === word) {
            return;
          }
        }
        $scope.saveToLocalStorage(word, size);
        return;
      }
      $scope.saveToLocalStorage(word, size);
    } else {
      $scope.addAlert('This word does not exist in our dictionary, please try an other one!');
    }
  };

  $scope.saveToLocalStorage = function(word, size) {
    $scope.toSave = {};
    $scope.toSave.string = word;
    $scope.toSave.size = size;
    $scope.highscores.push($scope.toSave);
    localStorage.setItem('highscores', JSON.stringify($scope.highscores));
    $scope.guess = '';
    $scope.addAlert('You have earned ' + $scope.wordLength + ' points');
  };
});
