tributeApp.directive('scroll', ['$window', function($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind('scroll', function() {
      scope.scrolled = this.pageYOffset > scope.h ? true : false;
      scope.$apply();
    });
  };
}]);