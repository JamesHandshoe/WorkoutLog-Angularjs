(function(){
	angular.module('workoutlog')
		.service('SessionToken', ['$window', function($window) {
			function SessionToken(){
				this.sessionToken = $window.localStorage.getItem('sessionToken');
			}

			SessionToken.prototype.set = function(token) {
				this.sessionToken = token;
				$window.localStorage.setItem('sessionToken', token);
			};

			SessionToken.prototype.get = function(){
				return this.sessionToken;
			};

			SessionToken.prototype.clear = function() {
				this.sessionToken = undefined;
				$window.localStorage.removeItem('sessionToken');
			};
			return new SessionToken();
		}]);
})();