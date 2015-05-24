	var myApp = angular.module('myApp',[]);

	myApp.controller('AppCtrl',['$scope','$http',function($scope, $http){

		var refresh = function() {
			$http.get('/clientlist').success(function(response){
			$scope.clientlist = response;
			$scope.client = "";
		});
		};

		refresh();

		$scope.addClient = function() {
			console.log($scope.client);
			$http.post('/clientlist', $scope.client).success(function(response){
				refresh();
			});

		};

		$scope.remove = function(id){
			$http.delete('/clientlist/' + id).success(function(response){
				refresh();
			});
		};

		$scope.edit = function(id) {
			$http.get('/clientlist/' + id).success(function(response){
				$scope.client = response;
			});
		};

		$scope.update = function() {
			$http.put('/clientlist/' + $scope.client._id, $scope.client).success(function(response){
				refresh();
			});
		};

		$scope.deselect = function() {
			$scope.client = "";
		};

	}]);