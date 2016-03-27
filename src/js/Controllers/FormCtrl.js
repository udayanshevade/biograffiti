tributeApp.controller('formCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

  $scope.wikiOptionsBaseURL = 'http://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=opensearch&format=json&search=';

  $scope.options = [];

  $scope.timeoutPromise = null;

  $scope.getSearchOptions = function() {
    var wikiURL = $scope.wikiOptionsBaseURL + $scope.query.title;

    $http.jsonp(wikiURL)
      .then(function(response) {
        $scope.options = [];

        $scope.options = response.data[1];

      }, function() {
        // error
      });
  };

  $scope.setTimeout = function() {
    $scope.timeoutPromise = $timeout(function() {
      $scope.getSearchOptions();
    }, 80);
  };

  $scope.searchAutoComplete = function($event) {
    if ($event.keyCode !== 13 && $event.keyCode !== 27) {

      if ($scope.timeoutPromise) {
        $timeout.cancel($scope.timeoutPromise);
        $scope.timeoutPromise = null;
      }

      $scope.setTimeout();
    }
  };

}]);