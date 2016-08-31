var dictionaryGame = angular.module('dictionaryGame', ['ui.router']);
var dictionary = new Typo("en_US", false, false, {
    dictionaryPath: "../node_modules/typo-js/dictionaries"
});

var highscores = localStorage.getItem['highscores'] || [] ;

dictionaryGame.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'index.html',
      controller: 'MainCtrl'
    })
    .state('highscores', {
      url: '/highscores',
      templateUrl: 'highscore.html',
      controller: 'MainCtrl'
    })
});

dictionaryGame.factory('Config', function() {
  return {
    successDom: document.querySelector('')
  }
});

dictionaryGame.factory('GameService', function() {
  return {
    isHighscore: function(list, string, fn) {
      list.every(fn);
    },
    checkWord: function(word) {
      return dictionary.check(word);
    },
    countUniqueLetters: function(word) {
      var uniqueLetters = new Set(word.split(''));
      return uniqueLetters.size;
    }
  }
});

dictionaryGame.controller('MainCtrl', function($scope, $timeout, GameService) {
  $scope.wordLength;
  $scope.word = '';
  $scope.highscores = highscores;

  $scope.alerts = [
    ];

  $scope.addAlert = function(text) {
    $scope.alerts.push({msg: text});
    $timeout($scope.closeAlert, 2000);
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.checkProperty = function(element) {
    element.hasOwnProperty()
  };
  $scope.printWord = function(word) {
    $scope.word = word;
    if (GameService.checkWord(word)) {
      var size = GameService.countUniqueLetters(word);
      $scope.wordLength = size;
      if (highscores.length) {
        for (var i = 0; i < highscores.length; i++) {
          if (highscores[i].string === word) {
            return;
          }
        }
        $scope.saveToLocalStorage(word, size);
        return;
      }
      $scope.saveToLocalStorage(word, size);
      return;
    } else {
      $scope.addAlert('This word does not exist in our dictionary, please try an other one!');
    }
  }

  $scope.saveToLocalStorage = function(word, size) {
    localStorage.clear();
    $scope.toSave = {};
    $scope.toSave.string = word;
    $scope.toSave.size = size;
    highscores.push($scope.toSave);
    localStorage.setItem('highscores',JSON.stringify(highscores));
    $scope.guess = '';
    $scope.addAlert('You have earned ' + $scope.wordLength + 'points');
  }


});
