(function () {
	'use strict';

	angular
	.module('clientsApp')
	.controller('HomeCtrl', AppCtrl);

	AppCtrl.$inject = ['$http', '$modal', '$log'];

	function AppCtrl($http, $modal, $log){
		var vm = this;
		vm.client= {
			phones : []
		};

		function refresh() {
			$http.get('/clients').success(function(response){
				vm.clientList = response;
				vm.clear();
			});
		};

		refresh();

		vm.add = function(validForm) {
			if(validForm && vm.client.phones.length != 0){
				$http.get('/clients/findbycpf/' + vm.client.cpf).success(function(response){
					var foundClient = response;
					if(foundClient==null){
						$http.post('/clients', vm.client).success(function(response){
							refresh();
						});
					}else{
						vm.duplicatedClient = true;
						vm.tableForm.$submitted=true;
					}
				});
			}else{
				vm.tableForm.$submitted=true;
			}

		};

		vm.remove = function(id){
			$http.delete('/clients/' + id).success(function(response){
				refresh();
			});
		};

		vm.edit = function(id) {
			$http.get('/clients/' + id).success(function(response){
				vm.client = response;
			});
		};

		vm.update = function(validForm) {
			if(validForm && vm.client.phones.length != 0){
				$http.put('/clients/' + vm.client._id, vm.client).success(function(response){
					refresh();
				});
			}else{
				vm.tableForm.$submitted=true;
			}
		};

		vm.clear = function() {
			vm.duplicatedClient = false;
			vm.client = {
				phones : []
			};
			vm.tableForm.$submitted = false;
		};

		vm.openModal = function () {

			var modalInstance = $modal.open({
				animation: true,
				templateUrl: '../phones/phones.html',
				controller: 'PhonesCtrl',
				size: 'sm',
				resolve: {
					client: function () {
						return vm.client;
					}
				}
			});

			modalInstance.result.then(function () {
				vm.client.phones = phones;
			}, function () {
				//$log.info('Modal dismissed at: ' + new Date());
			});

		};

		vm.formatCpf =function(cpf){
			var first = cpf.substring(0, 3);
			var second = cpf.substring(3, 6);
			var third = cpf.substring(6, 9);
			var fourth = cpf.substring(9, 11);
			return first + "." + second + "." + third + "-" + fourth;
		}

	}
})();
