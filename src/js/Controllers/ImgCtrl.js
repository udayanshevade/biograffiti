/*
 * Image Controller - handles images
 * returns images and sets up interactivity
 * @params: $scope and $http
 *
 */
tributeApp.controller('imgCtrl', ['$scope', '$http', function($scope, $http) {

  // basic wiki image url
  $scope.wikiImageBaseURL = 'https://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&format=json&action=query&redirects&prop=imageinfo&iiprop=url&generator=images&titles=';

  // switch slide visibility
  $scope.switchSlide = function() {
    $scope.images.forEach(function(image) {
      image.visible = false;
    });
    if ($scope.images.length) {
      $scope.images[$scope.imgIndex].visible = true;
    }
  };

  // cycle to the next image upon click
  $scope.cycleNext = function() {
    if ($scope.imgIndex < $scope.images.length - 1) { $scope.imgIndex++; } else { $scope.imgIndex = 0; }
    $scope.switchSlide();
  };

  /*
   * query wiki api for images
   */
  $scope.fetchImages = function() {
    var wikiImageURL = $scope.wikiImageBaseURL + $scope.query.title;
    $http.jsonp(wikiImageURL)
      .then(function(response) {
        $scope.images = [];
        var query = response.data.query;
        // parse response
        if (query) {
          var pages = query.pages;
          if (pages.hasOwnProperty('-1')) {
            var i, url;
            for (i in pages) {
              if (pages.hasOwnProperty(i)) {
                url = pages[i].imageinfo[0].url;
                // check formats
                if (url.indexOf('.jpg') > 0 ||
                   url.indexOf('.png') > 0) {
                  // cache each image
                  $scope.images.push({
                    'src': url,
                    'visible': false
                  });
                }
              }
            }
            // display first slide
            $scope.switchSlide();
          }
        }
      }, function() {
        // otherwise leave images empty on error
        $scope.images = [];
      });
  };

  // when new search event broadcasted by parent
  $scope.$on('new-search', function() {
    // perform new image fetch
    $scope.fetchImages();
  });

  // initialize empty array
  $scope.images = [];
  // perform initial image fetch
  $scope.fetchImages();

}]);