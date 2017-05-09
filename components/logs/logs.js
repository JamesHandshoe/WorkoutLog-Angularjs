(function(){
	angular.module('workoutlog.logs', [
		'ui.router'
	])
	.config(logsConfig);

	logsConfig.$inject = ['$stateProvider'];
	function logsConfig($stateProvider) {

		$stateProvider
			.state('logs', {
				url: '/logs',
				templateUrl: '/components/logs/logs.html',
				controller: LogsController,
				controllerAs: 'ctrl',
				bindToController: this,
				resolve: {
					getUserDefinitions: [
						'DefineService',
						function(DefineService) {
							return DefineService.fetch();
						}
					]
				}
			})
			.state('logs/update', {
				url: '/logs/:id',
				templateUrl: '/components/logs/logUpdate.html',
				controller: LogsController,
				controllerAs: 'ctrl',
				bindToController: this,
				resolve: { 
					getSingleLog: function($stateParams, LogsService) {
							return LogsService.fetchOne($stateParams.id);
					},

					getUserDefinitions: function(DefineService) {
						return DefineService.fetch();
					}		
				}
			});
	}

	
	LogsController.$inject = ['$state', 'DefineService', 'LogsService'];
	function LogsController($state, DefineService, LogsService) {
		var vm = this;
		vm.saved = false;
		vm.log = {};
		vm.userDefinitions = DefineService.getDefinitions();
		vm.updateLog = LogsService.getLog();
		vm.save = function() {
			LogsService.save(vm.log)
				.then(function(){
					vm.saved = true;
					$state.go('history');
				});
		};

		//create an update function here
		vm.updateSingleLog = function() {
			var logToUpdate = {
				id: vm.updateLog.id,
				desc: vm.updateLog.description,
				result: vm.updateLog.result,
				def: vm.updateLog.def
			}
			LogsService.updateLog(logToUpdate)
				.then(function() {
					$state.go('history');
				});
		};
	}
})();