var myblog = angular.module('app', ['ui.router']);

myblog.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url:'/home',
			templateUrl : 'view/home.html'
		})
		.state('solani', {
			url:'/movie/sorani',
			templateUrl:'view/movies/sorani.html'
		})
}]);