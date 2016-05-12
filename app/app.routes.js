(function () {
	'use strict';

	angular
  .module('clientsApp')
    .config(routes);

  function routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        })
        .otherwise({
          redirectTo: '/'
        });
  }

})();
