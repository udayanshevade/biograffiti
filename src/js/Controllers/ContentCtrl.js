tributeApp.controller('contentCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.baseWikiString = 'https://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=query&prop=extracts&format=json&redirects&titles=';

  $scope.getWikiContent = function() {
    var wikiURL = $scope.baseWikiString + $scope.query.title;
    $http.jsonp(wikiURL)
      .then(function(response) {
        $scope.result.queryComplete = true;
        $scope.result.pageId = '';
        var pages = response.data.query.pages;
        for (var page in pages) {
          if (pages.hasOwnProperty(page)) {
            var extract = pages[page].extract;
            if (extract) { $scope.result.content = extract; } else { $scope.result.content = $scope.errorMsg; }

            if (page > -1) { $scope.result.pageId = '?curid=' + page; } else { $scope.result.pageId = ''; }
          }
        }
      }, function() {
        $scope.result.content = $scope.errorMsg;
      });
  };

  $scope.$on('new-search', function() {
    $scope.getWikiContent();
  });


  $scope.result.content = '';
  $scope.getWikiContent();

}]);