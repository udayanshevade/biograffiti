/*
 * Content Controller
 * returns content from Wikipedia
 * @params: $scope and $http
 *
 */
tributeApp.controller('contentCtrl', ['$scope', '$http', function($scope, $http) {

  // base wiki api url
  $scope.baseWikiString = 'https://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=query&prop=extracts&format=json&redirects&titles=';

  // queries wiki api
  $scope.getWikiContent = function() {
    var wikiURL = $scope.baseWikiString + $scope.query.title;
    $http.jsonp(wikiURL)
      .then(function(response) {
        // if data query successful
        // mark query complete
        $scope.result.queryComplete = true;
        $scope.result.pageId = '';
        var pages = response.data.query.pages;
        // parse the pages
        for (var page in pages) {
          if (pages.hasOwnProperty(page)) {
            // save the extract to our content
            var extract = pages[page].extract;
            if (extract) { $scope.result.content = extract; } else { $scope.result.content = $scope.errorMsg; }

            if (page > -1) { $scope.result.pageId = '?curid=' + page; } else { $scope.result.pageId = ''; }
          }
        }
      }, function() {
        // otherwise display error message
        $scope.result.content = $scope.errorMsg;
      });
  };

  /*
   * When a new search is broadcasted from parent
   * perform new content search
   */
  $scope.$on('new-search', function() {
    $scope.getWikiContent();
  });

  // initialize empty content
  $scope.result.content = '';
  // perform initial search
  $scope.getWikiContent();

}]);