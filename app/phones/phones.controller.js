(function () {
	'use strict';

	angular
	.module('clientsApp')
	.controller('PhonesCtrl', ModalCtrl);

	ModalCtrl.$inject = ['$modalInstance'];

	function ModalCtrl ($modalInstance, client) {

		vm.client = client;

		vm.addNewPhone = function() {
			vm.client.phones.push({'number' : ''});
		};

		vm.removePhone = function() {
			var lastItem = vm.client.phones.length-1;
			vm.client.phones.splice(lastItem);
		};

		vm.ok = function (validForm) {
			if(vm.client.phones.length != 0){
				if(validForm){
					$modalInstance.close();
				}else{
					vm.modalForm.$submitted = true;
				}
			}else{
				vm.modalForm.$submitted = true;
			}
		};

		vm.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

	}
})();
