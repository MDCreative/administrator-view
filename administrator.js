var app = angular.module("app", ["firebase"]);

app.controller("AddCtrl", function($scope, $firebase) 
{
	$scope.addLecturer = function()
	{
		$scope.mainRef = new Firebase("https://interactive-lecture.firebaseio.com/Test/"  $scope.id);
	};
});