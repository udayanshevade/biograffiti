/*
 * Main Controller - sets up basic functionality
 * @params: $scope, smoothScrollService, $window
 *
 */
tributeApp.controller('mainCtrl', ['$scope', 'smoothScrollService', '$window', function($scope, smoothScrollService, $window) {

  // default search term
  $scope.query = {
    title: 'Charles Darwin'
  };

  // empty initial content
  $scope.result = {
    'content': '',
    'pageId': '',
    'queryComplete': false
  };

  // placeholder image
  $scope.images = [{
    'src': 'http://placehold.it/400/400',
    'visible': true
  }];
  // start on second image of Darwin
  $scope.imgIndex = 1;

  // create basic error message template
  $scope.errorMsg = '<h3 class="error">could not find the right page at this time. please try again, or use a different search: correct spelling, spacing or punctuation can help, e.g. "louis c.k." instead of "louis ck".</h3>';

  /*
   * Helper fxn
   * Properly capitalizes search queries
   * helps with user experience
   */
  $scope.capitalize = function(str) {
    var splitStr = str.split(/[\s,.'-]+/),
        newStr = [];
    splitStr.forEach(function(substr) {
      newStr.push(
        substr.charAt(0).toUpperCase() + substr.slice(1).toLowerCase()
     );
    });
    return newStr.join(' ');
  };

  /*
   * Initiate new search
   */
  $scope.newSearch = function() {
    // if any search query term is entered
    if ($scope.query.title) {
      $scope.imgIndex = 0;
      var query = $scope.query.title;
      $scope.query.title = $scope.capitalize(query);
      $scope.result.queryComplete = false;
      // alert new search event to nested controller
      $scope.$broadcast('new-search');
    }
  };

  // invoke smooth scroll
  $scope.goTo = function(e) {
    smoothScrollService.scrollTo(e);
  };

  // define viewport height
  $scope.h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

}]);