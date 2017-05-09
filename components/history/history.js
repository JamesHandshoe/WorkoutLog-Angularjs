(function(){
	angular.module('workoutlog.history', [
		'ui.router'
	])
	.config(historyConfig);
	historyConfig.$inject = ['$stateProvider'];
	function historyConfig($stateProvider) {

		$stateProvider
			.state('history', {
				url: '/history',
				templateUrl: '/components/history/history.html',
				controller: HistoryController,
				controllerAs: 'ctrl',
				bindToController: this,
				resolve: {
					getUserLogs: [
						'LogsService',
						function(LogsService) {
							return LogsService.fetch();
						}
					]
				}
			});
	}

	HistoryController.$inject = ['$state', 'LogsService'];
	function HistoryController($state, LogsService) {
		var vm = this;
		vm.history = LogsService.getLogs();
		
		vm.delete = function(item) {
			LogsService.deleteLogs(item);
		};

		vm.updateLog = function(item) {
			$state.go('logs/update', { 'id': item.id });
		};	
	}
})();