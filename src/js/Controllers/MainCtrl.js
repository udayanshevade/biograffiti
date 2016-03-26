tributeApp.controller('mainCtrl', ['$scope', 'smoothScrollService', '$window', function($scope, smoothScrollService, $window) {

  $scope.title = 'Charles Darwin';

  $scope.content = '';

  $scope.images = [{
    'src': 'http://placehold.it/400/400',
    'visible': true
  }];

  $scope.imgIndex = 1;

  $scope.pageId = '';

  $scope.errorMsg = '<h3 class="error">could not find the appropriate page at this time. please try again, or use a different search. alternate spellings, spacing or punctuation can help.</h3>';

  $scope.capitalize = function(str) {
    var splitStr = str.split(' '),
        newStr = [];
    splitStr.forEach(function(substr) {
      newStr.push(
        substr.charAt(0).toUpperCase() + substr.slice(1).toLowerCase()
     );
    });
    return newStr.join(' ');
  };

  $scope.newSearch = function() {
    $scope.imgIndex = 0;
    var query = $scope.title;
    $scope.title = $scope.capitalize(query);
    $scope.$broadcast('new-search');
  };

  $scope.goTo = function(e) {
    smoothScrollService.scrollTo(e);
  };

  $scope.h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

}]);