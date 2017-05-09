 (function(){
	angular.module('workoutlog')
		.service('LogsService', LogsService);

		LogsService.$inject = ['$http', 'API_BASE'];
		function LogsService($http, API_BASE, DefineService) {
			var logsService = this;
			logsService.workouts = [];
			logsService.individualLog = {};
			//Saves the log
			logsService.save = function(log) {
				return $http.post(API_BASE + 'log', {
					log: log
				}).then(function(response){
					logsService.workouts.push(response);
				});
			};

			//Fetches all saved logs
			logsService.fetch = function(log) {
				return $http.get(API_BASE + 'log')
					.then(function(response){
						logsService.workouts = response.data;
					});
			};

			//exposes the array of log objects
			logsService.getLogs = function() {
				return logsService.workouts;
			};

			//Deletes the log from the array and 
			//also postgres
			logsService.deleteLogs = function(log) {
				var logIndex = logsService.workouts.indexOf(log);
				logsService.workouts.splice(logIndex, 1);
				var deleteData = {log: log};
				return $http({
					method: 'DELETE',
					url: API_BASE + "log",
					data: JSON.stringify(deleteData),
					headers: {"Content-Type": "application/json"}
				});
			};

			//TODO - create a fetchOne function

			logsService.fetchOne = function(log) {
				//console.log(log);
				return $http.get(API_BASE + 'log/' + log)
					.then(function(response) {
						logsService.individualLog = response.data;
					});
			};

			logsService.getLog = function() {
				return logsService.individualLog;
			};
			//TODO - create an update function
			logsService.updateLog = function(logToUpdate) {
				return $http.put(API_BASE + 'log', { log: logToUpdate });
			}

		}
})();