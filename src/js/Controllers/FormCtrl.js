/*
 * Form Controller - handles input, datalist and search-related fxns
 * @params: $scope, $http, $timeout
 */
tributeApp.controller('formCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

  // base wiki api title query url
  $scope.wikiOptionsBaseURL = 'http://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=opensearch&format=json&search=';

  // empty list of options for datalist/select
  $scope.options = [];

  // null timeout promise
  $scope.timeoutPromise = null;

  /*
   * perform ajax request for wiki titles
   */
  $scope.getSearchOptions = function() {
    var wikiURL = $scope.wikiOptionsBaseURL + $scope.query.title;

    $http.jsonp(wikiURL)
      .then(function(response) {
        $scope.options = [];
        // set options to response data array of article titles
        $scope.options = response.data[1];

      }, function() {
        // error
      });
  };

  // set timeout for on-the-fly autocomplete
  $scope.setTimeout = function() {
    // create a timeout promise
    $scope.timeoutPromise = $timeout(function() {
      // if any query is present
      if ($scope.query.title) {
        // fetch title options
        $scope.getSearchOptions();
      }
    }, 80);
  };

  /*
   * Provide autocomplete suggestions on the fly
   */
  $scope.searchAutoComplete = function($event) {
    // as long as keycode is not Ent or Esc
    if ($event.keyCode !== 13 && $event.keyCode !== 27) {

      // empty the promise if it exists
      if ($scope.timeoutPromise) {
        $timeout.cancel($scope.timeoutPromise);
        $scope.timeoutPromise = null;
      }
      // create a new timeout promise
      $scope.setTimeout();
    // else if Esc is pressed
    } else if ($event.keyCode === 27) {
      // empty the search
      $scope.emptySearch();
    }
  };

  // for convenience if input is pressed, empty search query
  $scope.emptySearch = function() {
    $scope.query.title = '';
  };

}]);