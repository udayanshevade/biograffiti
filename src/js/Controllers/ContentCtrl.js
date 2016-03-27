tributeApp.controller('contentCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.baseWikiString = 'https://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=query&prop=extracts&format=json&redirects&titles=';

  $scope.getWikiContent = function() {
    var wikiURL = $scope.baseWikiString + $scope.query.title;
    $http.jsonp(wikiURL)
      .then(function(response) {
        $scope.pageId = '';
        var pages = response.data.query.pages;
        for (var page in pages) {
          if (pages.hasOwnProperty(page)) {
            var extract = pages[page].extract;
            if (extract) { $scope.content = extract; } else { $scope.content = $scope.errorMsg; }

            if (page > -1) { $scope.pageId = '?curid=' + page; } else { $scope.pageId = ''; }
          }
        }
      }, function() {
        $scope.content = $scope.errorMsg;
      });
  };

  $scope.$on('new-search', function() {
    $scope.getWikiContent();
  });


  $scope.content = '';
  $scope.getWikiContent();

}]);