var myblog = angular.module('app', ['ui.router']);

myblog.config(function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
 
  $stateProvider.state('home', {
  	  url: '/home',
      templateUrl : 'view/home.html'
  })
});