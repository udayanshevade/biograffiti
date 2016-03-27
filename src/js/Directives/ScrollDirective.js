/*
 * Scroll Directive - handles scroll indicators
 * @params: scope, element, attrs
 *
 */
tributeApp.directive('scroll', ['$window', function($window) {
  return function(scope, element, attrs) {
    // bind window scroll
    angular.element($window).bind('scroll', function() {
      // set scrolled variable to true
      // when user has scrolled down one unit viewport-height
      scope.scrolled = this.pageYOffset > scope.h ? true : false;
      // register and apply the change
      scope.$apply();
    });
  };
}]);