tributeApp.controller('imgCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.wikiImageBaseURL = 'https://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&format=json&action=query&redirects&prop=imageinfo&iiprop=url&generator=images&titles=';

  $scope.switchSlide = function() {
    $scope.images.forEach(function(image) {
      image.visible = false;
    });
    $scope.images[$scope.imgIndex].visible = true;
  };

  $scope.cycleNext = function() {
    if ($scope.imgIndex < $scope.images.length - 1) { $scope.imgIndex++; } else { $scope.imgIndex = 0; }
    $scope.switchSlide();
  };

  $scope.fetchImages = function() {
    var wikiImageURL = $scope.wikiImageBaseURL + $scope.title;
    $http.jsonp(wikiImageURL)
      .then(function(response) {
        $scope.images = [];
        var query = response.data.query;
        if (query) {
          var pages = query.pages;
          if (pages.hasOwnProperty('-1')) {
            var i, url;
            for (i in pages) {
              if (pages.hasOwnProperty(i)) {
                url = pages[i].imageinfo[0].url;
                if (url.indexOf('.jpg') > 0 ||
                   url.indexOf('.png') > 0) {
                  $scope.images.push({
                    'src': url,
                    'visible': false
                  });
                }
              }
            }
            $scope.switchSlide();
          }
        }
      }, function() {
        $scope.content = $scope.errorMsg;
      });
  };

  $scope.$on('new-search', function() {
    $scope.fetchImages();
  });

  $scope.images = [];
  $scope.fetchImages();

}]);