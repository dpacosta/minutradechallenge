	var myApp = angular.module('myApp',['ui.utils','ngCpfCnpj']);

	myApp.controller('AppCtrl',['$scope','$http',function($scope, $http){

		var refresh = function() {
			$http.get('/clientlist').success(function(response){
			$scope.clientlist = response;
			$scope.clear();
		});
		};

		refresh();

		$scope.add = function(validForm) {
			if(validForm){
				$http.get('/clientlist/findbycpf/' + $scope.client.cpf).success(function(response){
				var foundClient = response;
				if(foundClient==null){
					$http.post('/clientlist', $scope.client).success(function(response){
					refresh();
					});
				}else{
					$scope.duplicatedClient = true;
					$scope.tableForm.$submitted=true;
				}
			});
			}else{
				$scope.tableForm.$submitted=true;
			}

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

		$scope.update = function(validForm) {
			if(validForm){
				$http.put('/clientlist/' + $scope.client._id, $scope.client).success(function(response){
					refresh();
				});
			}else{
				$scope.tableForm.$submitted=true;
			}
		};

		$scope.clear = function() {
			$scope.duplicatedClient = false;
			$scope.client = "";
			$scope.tableForm.$submitted=false;
		};

	}]);