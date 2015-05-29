	var myApp = angular.module('myApp',['ui.utils','ngCpfCnpj','ui.bootstrap']);

	myApp.controller('AppCtrl',function($scope, $http, $modal, $log){

		$scope.client= {
			phones : []
		};

		var refresh = function() {
			$http.get('/clientlist').success(function(response){
			$scope.clientlist = response;
			$scope.clear();
		});
		};

		refresh();

		$scope.add = function(validForm) {
			if(validForm && $scope.client.phones.length != 0){
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
			if(validForm && $scope.client.phones.length != 0){
				$http.put('/clientlist/' + $scope.client._id, $scope.client).success(function(response){
					refresh();
				});
			}else{
				$scope.tableForm.$submitted=true;
			}
		};

		$scope.clear = function() {
			$scope.duplicatedClient = false;
			$scope.client = {
				phones : []
			};
			$scope.tableForm.$submitted=false;
		};

		$scope.openModal = function () {

	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'dialogphone.html',
	      controller: 'ModalCtrl',
	      size: 'sm',
	      resolve: {
	        client: function () {
	          return $scope.client;
	        }
	      }
	    });

		modalInstance.result.then(function () {
		      $scope.client.phones = phones;
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });

	  };
	  
	  $scope.formatCpf =function(cpf){
	  	var first = cpf.substring(0, 3);
	  	var second = cpf.substring(3, 6);
	  	var third = cpf.substring(6, 9);
	  	var fourth = cpf.substring(9, 11);
	  	return first + "." + second + "." + third + "-" + fourth;
	  }

	});

	myApp.controller('ModalCtrl', function ($scope, $modalInstance, client) {
  
  $scope.client = client;

  $scope.addNewPhone = function() {
    $scope.client.phones.push({'number' : ''});
  };
    
  $scope.removePhone = function() {
    var lastItem = $scope.client.phones.length-1;
    $scope.client.phones.splice(lastItem);
  };

  $scope.ok = function (validForm) {
  	if($scope.client.phones.length != 0){
	  	if(validForm){
	  		$modalInstance.close();
	  	}else{
	  		$scope.modalForm.$submitted = true;
	  	}
  }else{
  	$scope.modalForm.$submitted = true;
  }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
 
});
