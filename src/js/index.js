var tributeApp = angular.module('tributeApp', ['ngSanitize', 'ngAnimate']);

tributeApp.controller('mainCtrl', ['$scope', function($scope) {

  $scope.title = 'Albert Einstein';

  $scope.content = '';

  $scope.images = [];
  $scope.imgIndex = 0;

  $scope.pageId = '';

  $scope.capitalize = function(str) {
    var char,
        splitStr = str.split(' '),
        newStr = [];
    splitStr.forEach(function(substr) {
      newStr.push(
        substr.charAt(0).toUpperCase() + substr.slice(1).toLowerCase()
     );
    });
    return newStr.join(' ');
  };

  $scope.newSearch = function() {
    $scope.content = '';
    $scope.images = [];
    $scope.imgIndex = 0;
    var query = $scope.title;
    $scope.title = $scope.capitalize(query);
    $scope.$broadcast('new-search');
  };

}]);

tributeApp.controller('contentCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.baseWikiString = 'https://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=query&prop=extracts&format=json&redirects&titles=';

  $scope.getWikiContent = function() {
    var wikiURL = $scope.baseWikiString + $scope.title;
    $http.jsonp(wikiURL)
      .then(function(response) {
        var pages = response.data.query.pages;
        for (var page in pages) {
          if (pages.hasOwnProperty(page)) {
            $scope.content =
              pages[page].extract;
            $scope.pageId = '?curid=' + page;
          }
        }
      }, function(e) {
        console.log(e);
      });
  };

  $scope.$on('new-search', function() {
    $scope.getWikiContent();
  });

  $scope.getWikiContent();

}]);

tributeApp.controller('imgCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.wikiImageBaseURL = 'https://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&format=json&action=query&redirects&prop=imageinfo&iiprop=url&generator=images&titles=';

  $scope.switchSlide = function() {
    $scope.images.forEach(function(image) {
      image.visible = false;
    });
    $scope.images[$scope.imgIndex].visible = true;
  };

  $scope.cycleNext = function() {
    $scope.imgIndex < $scope.images.length - 1 ? $scope.imgIndex++ : $scope.imgIndex = 0;
    $scope.switchSlide();
  };

  $scope.fetchImages = function() {
    var wikiImageURL = $scope.wikiImageBaseURL + $scope.title;
    $http.jsonp(wikiImageURL)
      .then(function(response) {
        var pages = response.data.query.pages;
        if (pages.hasOwnProperty('-1')) {
          var i, url;
          for (i in pages) {
            url = pages[i].imageinfo[0].url;
            if (url.indexOf('.jpg') > 0 ||
               url.indexOf('.png') > 0) {
              $scope.images.push({
                'src': url,
                'visible': false
              });
            }
          }
          $scope.switchSlide();
        }
      }, function(e) {
        console.log(e);
      });
  };

  $scope.$on('new-search', function() {
    $scope.fetchImages();
  });

  $scope.fetchImages();

}]);