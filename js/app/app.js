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
		.state('guitartheory', {
			url:'/guitartool',
			controller:'ScaleController',
			templateUrl:'view/guitartool/index.html'
		})
		.state('gsk', {
			url:'/gsk',
			templateUrl:'view/gsk.html'
		})
		.state('happ', {
			url:'/happ',
			templateUrl:'view/happ.html'
		})
}]);

myblog.controller('ScaleController', function ScaleController($scope){
	$scope.modeDic = {0 : 'C', 1:'C#/Db', 2:'D', 3:'D#/Eb' ,4:'E', 5:'F', 6:'F#/Gb', 7:'G', 8:'G#/Ab' ,9:'A', 10:'A#/Bb', 11 : 'B'}
	$scope.allScaleNotes = getScaleData();
	$scope.puzzleScale = getPuzzleScale();
	$scope.frets = ['', '1','2','3','4','5','6','7','8','9','10','11','12'];
    $scope.showNote = showNote;
	function getPuzzleScale(){
		var puzzleList = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		]
		var puzzlePairs = getPuzzlePairs(10);
		for (puzzleIndex in puzzlePairs)	{
			puzzleList[puzzlePairs[puzzleIndex][0]][puzzlePairs[puzzleIndex][1]] = 1;
		}
		return puzzleList;
	}

	function getPuzzlePairs(puzzleCount = 1){
		var puzzleList = [];
		for (var i = 0; i < puzzleCount; i++) {
			var row = Math.floor(Math.random() * 6);
			var col = Math.floor(Math.random() * 13);
			puzzleList.push([row, col]);
		}
		return puzzleList;
	}

	function getScaleData(key = 'C'){
		return [
		getScaleNumberList(5, 1),
		getScaleNumberList(0, 2),
		getScaleNumberList(8, 3),
		getScaleNumberList(3, 4),
		getScaleNumberList(10, 5),
		getScaleNumberList(5, 6)
		]	
	}

	function getScaleNumberList(start, lineNo){
		var list = [];
		for (var i = start; i < start + 12; i++) {
			list.push($scope.modeDic[i % 12]);
		}
		list.splice(0, 0, lineNo);
		return list;
	}

	function showNote(puzzle, pIndex, index){
		if (puzzle !== 1) {return;}
		// alert($scope.allScaleNotes[pIndex][index])
		$(".puzzle").popover('show');
	}
})
